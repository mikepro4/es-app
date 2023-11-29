import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import throttle from 'lodash/throttle';

import _ from 'lodash';

import { updateCollection, updateCollectionItem } from "@/redux"

import TestView from "./views/test_list_view"
import ShapeView from "./views/shape_list_view"
import AlgoView from "./views/algo_list_view"
import TrackView from "./views/track_list_view"
import AlbumView from "./views/album_list_view"
import HardwareView from "./views/hardware_list_view"
import TierView from "./views/tier_list_view"

function InfiniteList({
    type,
    resultType,
    limit,
    criteria,
    searchCollection,
    handleClick,
    updateCollectionStats,
    order,
    sortProperty,
    contained,
    scrollValue,
    loadCollectionItem
}) {

    const app = useSelector((state) => state.app);
    const updateCollectionValue = useSelector(state => state.app.updateCollection);
    const updateCollectionItemValue = useSelector(state => state.app.updateCollectionItem);
    const router = useRouter();
    const dispatch = useDispatch()

    const anchorRef = useRef(null);

    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(false);

    const localOffset = useRef(0);
    const count = useRef(0);

    const sortPropertyRef = useRef(sortProperty);
    const orderRef = useRef(order);
    const criteriaRef = useRef(criteria);

    const searchCollectionFunction = useCallback((offset, reset) => {

        if (!loading && anchorRef.current) {

            if (offset == 0 || offset <= count.current) {
                setLoading(true)
                console.log({
                    criteria: criteriaRef.current,
                    sortProperty: sortPropertyRef.current,
                    offset: offset,
                    limit: limit ? limit : 20,
                    order: orderRef.current,
                })



                dispatch(
                    searchCollection(
                        {
                            criteria: criteriaRef.current,
                            sortProperty: sortPropertyRef.current,
                            offset: offset,
                            limit: limit ? limit : 20,
                            order: orderRef.current,
                            callback: (data) => {
                                setLoading(false);
                                setCollection(prevCollection => reset ? data.all : [...prevCollection, ...data.all]); // Use functional update
                                localOffset.current = localOffset.current + limit
                                count.current = data.count
                                dispatch(updateCollection(false))
                                updateCollectionStats(data.count, data.total)
                            }
                        },)
                )
            }

        }
    }, [loading, count.current, criteria, sortPropertyRef.current, localOffset.current, limit, orderRef.current, dispatch, searchCollection, collection]);


    const renderResultItem = (item, i) => {
        switch (resultType) {
            case "test-view-list":
                return (<TestView
                    item={item}
                    key={item._id}
                    handleClick={handleClick}
                />)
            case "shape-view-list":
                return (<ShapeView
                    item={item}
                    key={item._id}
                    handleClick={handleClick}
                />)
            case "algo-view-list":
                return (<AlgoView
                    item={item}
                    key={item._id}
                    handleClick={handleClick}
                />)
            case "track-view-list":
                return (<TrackView
                    item={item}
                    key={item._id}
                    handleClick={handleClick}
                />)
            case "album-view-list":
                return (<AlbumView
                    item={item}
                    key={item._id}
                    handleClick={handleClick}
                />)
            case "hardware-view-list":
                return (<HardwareView
                    item={item}
                    key={item._id}
                    handleClick={handleClick}
                />)
            case "tier-view-list":
                return (<TierView
                    item={item}
                    key={item._id}
                    handleClick={handleClick}
                />)
            default:
                return (
                    <div></div>
                )
        }
    }

    const updatePosition = useCallback(throttle(() => {
        if (localOffset.current !== 0) {
            if (anchorRef.current) {
                const rect = anchorRef.current.getBoundingClientRect();


                if (rect.top < 1200) {
                    searchCollectionFunction(localOffset.current)
                }
            }
        }

    }, 200), []);

    useEffect(() => {
        console.log("criteria", criteria)
        criteriaRef.current = criteria;
        setTimeout(() => {
            searchCollectionFunction(localOffset.current, true)
        }, 100)

        // window.addEventListener('scroll', updatePosition);

        // // updatePosition();

        // return () => {
        //     window.removeEventListener('scroll', updatePosition);
        // };
    }, []);

    useEffect(() => {
        if (!contained) {
            window.addEventListener('scroll', updatePosition);

        }

        return () => {
            if (!contained) {
                window.removeEventListener('scroll', updatePosition);
            }
        };
    }, [contained]);

    useEffect(() => {
        updatePosition()
    }, [scrollValue]);

    const resetCollection = useCallback(() => {
        setCollection([]);
        localOffset.current = 0;
        searchCollectionFunction(0, true);
    }, []);

    useEffect(() => {
        if (updateCollectionValue) {
            resetCollection()
        }

    }, [updateCollectionValue]);



    useEffect(() => {

        if (sortPropertyRef.current !== sortProperty) {
            sortPropertyRef.current = sortProperty;
            resetCollection()
        }

        if (orderRef.current !== order) {
            orderRef.current = order;
            resetCollection()
        }
    }, [sortProperty, order]);

    useEffect(() => {

        const areObjectsEqual = _.isEqual(criteriaRef.current, criteria);

        if (!areObjectsEqual) {
            criteriaRef.current = criteria;
            resetCollection()
        }

    }, [criteria]);

    useEffect(() => {
        if (updateCollectionItemValue) {
            // Dispatch the testItem action with a callback
            dispatch(
                loadCollectionItem({
                    id: updateCollectionItemValue,
                    callback: (data) => {
                        if (data == null) {
                            // Filter out the item from the collection
                            setCollection(prevCollection =>
                                prevCollection.filter(item => item._id !== updateCollectionItemValue)
                            );
                        } else {
                            // Map over the collection and replace the item with the updated data
                            setCollection(prevCollection =>
                                prevCollection.map(item =>
                                    item._id === updateCollectionItemValue ? data : item
                                )
                            );
                        }

                        dispatch(updateCollectionItem(null))
                    }
                })
            );
        }
    }, [updateCollectionItemValue]);

    return (
        <div className="infinite-list-container">
            <div className="infinite-list-items">
                {collection.map((item, i) => renderResultItem(item, i))}
            </div>

            <div className="anchor" ref={anchorRef}></div>
        </div>
    );
}

export default InfiniteList;
