import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";
import TrackAudioPlayer from "@/components/track_audio_player";

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
                if (data.code) {
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
                        label="All tracks"
                        icon="arrow-left"
                        minimal={true}
                        small={true}
                        wrap={true}
                        onClick={() => {
                            router.push({
                                pathname: '/music',
                                query: { ...router.query, trackId: null },
                            }, undefined, { shallow: true })
                            // router.back()
                        }
                        }
                    />

                </div>

                <ul className="music-page-container-header-right">
                    <li>
                        {track && track.album?._id && <Button
                        label="Go to album"
                        minimal={true}
                        small={true}
                        wrap={true}
                        purple={true}
                        onClick={() => {
                            router.push({
                                pathname: '/music',
                                query: { ...router.query, tab: 2, albumId: track.album._id },
                            }, undefined, { shallow: true })
                        }
                        }
                    />}
                    </li>

                    <li>
                        <TrackActionsView
                            item={track}
                        />
                    </li>
                </ul>
            </div>

            <div className="section-track-player">
                <TrackAudioPlayer
                    item={track}
                />
            </div>

            

            



        </div>
    );
}

export default TrackPageContainer;
