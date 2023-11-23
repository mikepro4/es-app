import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import throttle from 'lodash/throttle';

import TestView from "./views/test_list_view"

function InfiniteList({
    type,
    resultType,
    order,
    limit,
    criteria,
    sortProperty,
    searchCollection,
    handleClick
}) {

    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch()

    const anchorRef = useRef(null);

    const [collection, setCollection] = useState([false]);
    const [loading, setLoading] = useState(false);
    // const [localOffset, setOffset] = useState(0);
    // const [count, setCount] = useState(0);
    const [updateCollection, setUpdateCollection] = useState(null);

    const localOffset = useRef(0);
    const count = useRef(0);

    const searchCollectionFunction = useCallback((offset, reset) => {
        if (!loading && anchorRef.current) {

            if (offset == 0 || offset <= count.current) {
                setLoading(true)

                dispatch(
                    searchCollection(
                        {
                            criteria,
                            sortProperty,
                            offset: offset,
                            limit: limit ? limit : 20,
                            order: order ? order : "1",
                            callback: (data) => {
                                setLoading(false);
                                setCollection(prevCollection => reset ? data.all : [...prevCollection, ...data.all]); // Use functional update
                                localOffset.current = localOffset.current  + limit
                                count.current = data.count
                            }
                        },)
                )
            }

        }
    },  [loading, count.current, criteria, sortProperty, localOffset.current, limit, order, dispatch, searchCollection]);


    const renderResultItem = (item, i) => {
        switch (resultType) {
            case "test-view-list":
                if (!updateCollection) {
                    return (<TestView
                        item={item}
                        key={item._id}
                        type={type}
                        handleClick={handleClick}
                    />)
                } else {
                    return (<div key={item._id} ></div>)
                }
            default:
                return (
                    <div></div>
                )
        }
    }

    const updatePosition = useCallback(throttle(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();

            if (rect.top < 1000) {
                console.log("load")
                searchCollectionFunction(localOffset.current)
            }
        }
    }, 200), [searchCollectionFunction, loading]);

    

    useEffect(() => {

        searchCollectionFunction(localOffset.current)

        window.addEventListener('scroll', updatePosition);

        // Call updatePosition to set initial position
        updatePosition();

        return () => {
            window.removeEventListener('scroll', updatePosition);

        };
    }, []);



    return (
        <div className="infinite-list-container">
            infinite list / offset: 
            <div>
                {collection.map((item, i) => renderResultItem(item, i))}
            </div>
           
            <div className="anchor" ref={anchorRef}></div>
        </div>
    );
}

export default InfiniteList;
