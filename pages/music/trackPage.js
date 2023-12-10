import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";
import TrackAudioPlayer from "@/components/track_audio_player";
import InfiniteList from '@/components/infinite_list';

import TrackActionsView from "@/components/collection_actions/trackActions";

import HardwareItem from "./hardwareItem";

import { 
    trackUpdateItem, 
    updateCollectionItem, 
    trackItem, 
    trackUpdateManyItems,
    shapeSearch,
    shapeListUpdateStats,
    shapeItem
} from "@/redux";


function TrackPageContainer({
}) {

    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [track, setTrack] = useState(false);

    const [screenWidth, setScreenWidth] = useState(0);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [scroll, setScroll] = useState(0);
    const scrollContainerRef = useRef(null); 

    const handleScroll = () => {
        const position = scrollContainerRef.current.scrollTop
        setScroll(position)
    };

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('resize', handleResize);
        };

    }, []);


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
        <div className="music-page-container track-page-container" ref={scrollContainerRef}>

            <div className="music-page-center-container">


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

                {track?.hardware && <div className="track-hardware-container">
                    <div className="track-hardware-container-title">
                        Hardware
                    </div>

                    <div className="track-hardware-grid">
                        {track?.hardware?.map((item, index) => (
                            <HardwareItem item={item} index={index}/>
                        ))}
                    </div>
                </div>}

                <div className="music-shapes-container">
                    <div className="music-shapes-container-title">
                        {count} shapes linked to track
                    </div>

                    {track && <InfiniteList
                        resultType="shape-view-list"
                        limit={20}
                        contained={screenWidth > 500 ? true : false}
                        scrollValue={scroll}
                        sortProperty={"created"}
                        order={"-1"}
                        criteria={{
                            status: "approved",
                            track: track._id
                        }}
                        // identifier={this.props.query.folder}
                        searchCollection={shapeSearch}
                        updateCollectionStats={(count, total) => {
                            setCount(count)
                            setTotal(total)
                            // dispatch(shapeListUpdateStats({ count: count, total: total }))

                        }}
                        loadCollectionItem={shapeItem}
                        handleClick={() => { }}
                    />}
                </div>

            </div>





        </div>
    );
}

export default TrackPageContainer;
