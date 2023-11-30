import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import TabBar from '@/components/tab'

import { togglePlayer, shapeNextItem, shapePreviousItem, shapeItem, toggleDrawer, toggleParamsValues } from "@/redux";

import CollectionGoBack from "../collection_go_back";

import ShapeActionsView from "../collection_actions/shapeActions";
import ShapeMainInfo from "../shape_main_info";

import NftDetails from "../nft_details";

import Icon from "../icon";

import Viz from "@/components/viz";

function Player() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const updateCollectionItemValue = useSelector((state) => state.app.updateCollectionItem);
    const router = useRouter();
    const query = router.query;
    const dispatch = useDispatch();
    const shapeList = useSelector((state) => state.shapeList);
    const [selectedTabId, setSelectedTabId] = useState(1);

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
            dispatch(toggleParamsValues(null))
        };
    }, []);

    useEffect(() => {
        if (updateCollectionItemValue) {
            dispatch(shapeItem({
                id: app.playerData._id, callback: (data) => {
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

    let tabs = [
        "Animation",
        "NFT Details"
    ]

    const selectTab = (tab) => {
        setSelectedTabId(tab)
        // router.push({
        //   pathname: router.pathname,
        //   query: { ...router.query, tab: tab }
        // }, undefined, { shallow: true });
    }

    const renderTab = () => {
        switch (selectedTabId) {
            case 1:
                return (<div className="player-viz-container">
                    <Viz 
                        item={app.paramsValues ? app.paramsValues :app.playerData?.params}
                        fullScreen={true}
                    />
                </div>)
            case 2:
                return (<NftDetails/>)
            default:
                return;
        }
    }

    return (
        <div className="main-player" >

            <div className="player-tabs">
                <TabBar
                    tabs={tabs}
                    activeTab={selectedTabId}
                    onTabChange={(tab) => selectTab(tab)}
                />
            </div>

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
            {/* <div className="main-player-header">

                <ShapeActionsView
                    item={app.playerData}
                    onChange={(data) => {
                        dispatch(togglePlayer({
                            playerOpen: true,
                            playerData: data
                        }))


                    }}
                />

            </div> */}
            {/* {app.playerData?.name} */}

            {renderTab()}

            <div className="player-main-info">
                <ShapeMainInfo
                    item={app.playerData}
                />
            </div>

            <ul className="play-main-actions">

                <li className="player-main-action">
                    <Icon name="heart" />
                    <div className="player-main-action-label">0</div>
                </li>

                <li className="player-main-action">
                    <Icon name="share" />
                    <div className="player-main-action-label">Share</div>
                </li>

                <li className="player-main-action" onClick={() => {
                    dispatch(toggleDrawer({
                        drawerOpen: true,
                        drawerType: "viz-settings",
                        drawerData: app.playerData,
                    }));
                }}>
                    <Icon name="properties" />
                </li>
            </ul>

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
