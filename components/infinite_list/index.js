import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import throttle from 'lodash/throttle';

import { updateCollection } from "@/redux"

import TestView from "./views/test_list_view"

function InfiniteList({
    type,
    resultType,
    order,
    limit,
    criteria,
    sortProperty,
    searchCollection,
    handleClick,
    updateCollectionStats
}) {

    const app = useSelector((state) => state.app);
    const updateCollectionValue = useSelector(state => state.app.updateCollection);
    const router = useRouter();
    const dispatch = useDispatch()

    const anchorRef = useRef(null);

    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(false);

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
                            order: order ? order : "-1",
                            callback: (data) => {
                                setLoading(false);
                                setCollection(prevCollection => reset ? data.all : [...prevCollection, ...data.all]); // Use functional update
                                localOffset.current = localOffset.current  + limit
                                count.current = data.count
                                dispatch(updateCollection(false))
                                updateCollectionStats(data.count, data.total)
                            }
                        },)
                )
            }

        }
    },  [loading, count.current, criteria, sortProperty, localOffset.current, limit, order, dispatch, searchCollection]);


    const renderResultItem = (item, i) => {
        switch (resultType) {
            case "test-view-list":
                return (<TestView
                    item={item}
                    key={item._id}
                    type={type}
                    handleClick={handleClick}
                />)
            default:
                return (
                    <div></div>
                )
        }
    }

    const updatePosition = useCallback(throttle(() => {
        if(localOffset.current !== 0) {
            if (anchorRef.current) {
                const rect = anchorRef.current.getBoundingClientRect();
    
                if (rect.top < 1200) {
                    searchCollectionFunction(localOffset.current)
                }
            }
        }
        
    }, 200), [searchCollectionFunction, loading]);

    

    useEffect(() => {
        setTimeout(() => { 
            searchCollectionFunction(localOffset.current)
        }, 100)

        window.addEventListener('scroll', updatePosition);

        // updatePosition();

        return () => {
            window.removeEventListener('scroll', updatePosition);
        };
    }, []);

    useEffect(() => {
        if(updateCollectionValue) {
            setCollection([]);
            localOffset.current = 0;
            searchCollectionFunction(0, true);
        }
        
    }, [updateCollectionValue]);

    return (
        <div className="infinite-list-container">
            <div>
                {collection.map((item, i) => renderResultItem(item, i))}
            </div>
           
            <div className="anchor" ref={anchorRef}></div>
        </div>
    );
}

export default InfiniteList;
