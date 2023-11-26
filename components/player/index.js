import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { togglePlayer, shapeNextItem, shapePreviousItem, shapeItem } from "@/redux";

import CollectionGoBack from "../collection_go_back";

import ShapeActionsView from "../collection_actions/shapeActions";
import ShapeMainInfo from "../shape_main_info";

function Player() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const updateCollectionItemValue = useSelector((state) => state.app.updateCollectionItem);
    const router = useRouter();
    const query = router.query;
    const dispatch = useDispatch();
    const shapeList = useSelector((state) => state.shapeList);

    const [prevPathname, setPrevPathname] = useState(null);

    useEffect(() => {
        const handleRouteChange = (url) => {
            // Check if previous pathname is not equal to the new pathname
            if (!router.query.shapeId && prevPathname !== router.query) {
                console.log('Pathname changed from', prevPathname, 'to', router.query);

                dispatch(togglePlayer({
                    playerOpen: false,
                    playerData: null
                })
                )
                // Update the previous pathname
                setPrevPathname(router.query);
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        // Initialize the previous pathname
        setPrevPathname(router.query);

        // Cleanup
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router, prevPathname]);



    useEffect(() => {
        document.body.classList.add("no-scroll")
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    useEffect(() => {
        if (updateCollectionItemValue) {
            dispatch(shapeItem({
                shapeId: app.playerData._id, callback: (data) => {
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: data
                    }))
                }
            }))
        }
    }, [updateCollectionItemValue]);

    useEffect(() => {
        // Update the URL with the item ID as a query parameter
        if (app.playerData?._id) {
            console.log(router.pathname)
            router.push({
                pathname: router.pathname,
                query: { ...router.query, shapeId: app.playerData._id }
            }, undefined, { shallow: true });
        }
    }, [app.playerData?._id]);

    const renderCollectionButton = () => {
        return (
            <CollectionGoBack
                label={router.pathname == "/shape" ? "Go to collection" : "Close"}
                icon="x"
                onClick={() => {
                    dispatch(togglePlayer({
                        playerOpen: false,
                        playerData: null
                    }))

                    if (router.pathname == "/shape") {
                        router.push("/genesis")
                    } else {
                        router.push({
                            pathname: router.pathname,
                            query: {}
                        }, undefined, { shallow: true });
                    }
                }}
            />
        )
    }


    return (
        <div className="main-player" >

            <div className="main-player-left-header">

                <ul className="go-back-button-desktop">
                    <li>{renderCollectionButton()}</li>

                    <li>
                        <CollectionGoBack
                            icon="arrow-back"
                            onClick={() => {
                                dispatch(shapePreviousItem({
                                    id: app.playerData._id,
                                    sortProperty: shapeList.sortProperty,
                                    order: shapeList.order,
                                    criteria: shapeList.criteria,
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
                            icon="arrow-forward"
                            onClick={() => {
                                dispatch(shapeNextItem({
                                    id: app.playerData._id,
                                    sortProperty: shapeList.sortProperty,
                                    order: shapeList.order,
                                    criteria: shapeList.criteria,
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
            <div className="main-player-header">

                <ShapeActionsView
                    item={app.playerData}
                    onChange={(data) => {
                        dispatch(togglePlayer({
                            playerOpen: true,
                            playerData: data
                        }))


                    }}
                />

            </div>
            {/* {app.playerData?.name} */}

            <div className="player-viz-container">
                <div className="shape-placeholder"></div>
            </div>

            <div className="player-main-info">
                <ShapeMainInfo
                    item={app.playerData}
                />
            </div>

            <div className="collection-info-bar-container">

                <div className="collection-info-bar-container-left">
                    <div className="go-back-button-mobile">
                        {renderCollectionButton()}
                    </div>
                </div>

                <ul className="collection-info-bar-container-right">
                    <li>
                        <CollectionGoBack
                            icon="arrow-back"
                            onClick={() => {
                                dispatch(shapePreviousItem({
                                    id: app.playerData._id,
                                    sortProperty: shapeList.sortProperty,
                                    order: shapeList.order,
                                    criteria: shapeList.criteria,
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
                                dispatch(shapeNextItem({
                                    id: app.playerData._id,
                                    sortProperty: shapeList.sortProperty,
                                    order: shapeList.order,
                                    criteria: shapeList.criteria,
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
