import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { togglePlayer, testNextItem, testPreviousItem, testItem } from "@/redux";

import CollectionGoBack from "../collection_go_back";

import TestActionsView from "../testActions";

function Player() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const updateCollectionItemValue = useSelector((state) => state.app.updateCollectionItem);
    const router = useRouter();
    const dispatch = useDispatch();
    const testList = useSelector((state) => state.testList);



    useEffect(() => {
        document.body.classList.add("no-scroll")
        return () => {
            document.body.classList.remove("no-scroll")
        };
    }, []);

    useEffect(() => {
        if (updateCollectionItemValue) {
            dispatch(testItem({
                testId: app.playerData._id, callback: (data) => {
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: data
                    }))
                }
            }))
        }
    }, [updateCollectionItemValue]);

    return (
        <div className="main-player">
            <div className="main-player-header">
                <div className="main-player-left">
                </div>
                <div className="main-player-right">

                    <TestActionsView
                        item={app.playerData}
                        onChange={(data) => {
                            dispatch(togglePlayer({
                                playerOpen: true,
                                playerData: data
                            }))
                        }}
                    />
                </div>

            </div>
            {app.playerData.name}

            <div className="collection-info-bar-container">

                <div className="collection-info-bar-container-left">
                    <CollectionGoBack
                        label="Go Back"
                        icon="x"
                        onClick={() => {
                            dispatch(togglePlayer({
                                playerOpen: false,
                                playerData: null
                            }))
                        }}
                    />
                </div>

                <ul className="collection-info-bar-container-right">
                    <li>
                        <CollectionGoBack
                            icon="arrow-back"
                            onClick={() => {
                                dispatch(testPreviousItem({
                                    id: app.playerData._id,
                                    sortProperty: testList.sortProperty,
                                    order: testList.order,
                                    criteria: testList.criteria,
                                    callback: (data) => {
                                        dispatch(togglePlayer({
                                            playerOpen: true,
                                            playerData: data
                                        }))
                                    }
                                }))
                            }}
                        />
                    </li>

                    <li>
                        <CollectionGoBack
                            label="Next"
                            iconRight="arrow-forward"
                            onClick={() => {
                                dispatch(testNextItem({
                                    id: app.playerData._id,
                                    sortProperty: testList.sortProperty,
                                    order: testList.order,
                                    criteria: testList.criteria,
                                    callback: (data) => {
                                        dispatch(togglePlayer({
                                            playerOpen: true,
                                            playerData: data
                                        }))
                                    }
                                }))
                            }}
                        />
                    </li>
                </ul>
            </div>





        </div>
    );
}

export default Player;
