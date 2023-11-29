import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";

import TrackActionsView from "@/components/collection_actions/trackActions";

import { trackUpdateItem, updateCollectionItem, trackItem, trackUpdateManyItems } from "@/redux";


function TrackPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [track, setTrack] = useState(false);

    const fetchTrack = () => {
        dispatch(trackItem({
            id: router.query.trackId,
            callback: (data) => {
                console.log(data);
                setTrack(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
                if(data.code) {
                    setCodeItems(data.code)
                }
            }
        }))
    }

    useEffect(() => {
        fetchTrack()

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem && app.updateCollectionItem == track?._id) {
            fetchTrack()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.trackId && track?._id && router.query.trackId !== track?._id) {
            fetchTrack()
        }
    }, [router]);

     

    return (
        <div className="music-page-container track-page-container">

            <div className="music-page-container-header">

                <div className="music-page-container-header-left">
                    <Button
                        label="Back"
                        icon="arrow-left"
                        minimal={true}
                        small={true}
                        wrap={true}
                        onClick={() => {
                            router.push({
                                pathname: '/music',
                                query: { ...router.query, trackId: null },
                            }, undefined, { shallow: true })
                        }
                    }
                    />

                </div>

                <div className="music-page-container-header-right">
                <TrackActionsView
                        item={track}
                    />
                </div>
            </div>

            <h1>{track && track.name} </h1>

            <Button
                label="Go to album"
                icon="arrow-Right"
                minimal={true}
                small={true}
                wrap={true}
                onClick={() => {
                    router.push({
                        pathname: '/music',
                        query: { ...router.query, tab: 2, albumId: track.album._id },
                    }, undefined, { shallow: true })
                }
            }
            />

            
            
           
        </div>
    );
}

export default TrackPageContainer;
