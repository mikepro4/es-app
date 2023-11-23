import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import throttle from 'lodash/throttle';
import TestView from "./views/test_list_view";

function InfiniteList({ type, resultType, order, limit = 20, criteria, sortProperty, searchCollection, handleClick }) {
    const dispatch = useDispatch();
    const anchorRef = useRef(null);
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(false);
    const localOffset = useRef(0);
    const count = useRef(0);

    const searchCollectionFunction = useCallback((offset, reset = false) => {
        if (!loading && (offset === 0 || offset < count.current)) {
            setLoading(true);
            dispatch(searchCollection({
                criteria,
                sortProperty,
                offset,
                limit,
                order,
                callback: (data) => {
                    setLoading(false);
                    localOffset.current += limit;
                    count.current = data.count;
                    setCollection(reset ? data.all : prevCollection => [...prevCollection, ...data.all]);
                }
            }));
        }
    }, [loading, limit, order, dispatch, searchCollection]);

    const updatePosition = useCallback(throttle(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            if (rect.top <= 1000 && !loading) {
                searchCollectionFunction(localOffset.current);
            }
        }
    }, 200), [searchCollectionFunction, loading]);

    useEffect(() => {
        searchCollectionFunction(0, true);
        window.addEventListener('scroll', updatePosition);
        return () => window.removeEventListener('scroll', updatePosition);
    }, [updatePosition, searchCollectionFunction]);

    const renderResultItem = (item, i) => {
        switch (resultType) {
            case "test-view-list":
                return <TestView item={item} key={item._id} type={type} handleClick={handleClick} />;
            default:
                return <div key={i}></div>;
        }
    };

    return (
        <div className="infinite-list-container">
            <div>
                {collection.map(renderResultItem)}
            </div>
            <div className="anchor" ref={anchorRef}></div>
        </div>
    );
}

export default InfiniteList;
