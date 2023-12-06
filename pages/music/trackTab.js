import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import TracksDetails from "@/components/collectionControls/tracksDetails";
import InfiniteList from '@/components/infinite_list'

import TimeLine from '@/components/audio_player/TimeLine'
import { trackSearch, trackItem, trackListUpdateStats, resetPlayer, setCurrentTime, setDuration, setIsPlaying, setAnalyser, setConnected } from "@/redux"

function TracksTab() {
    // const [loading, setLoading] = useState(false);
    // const app = useSelector((state) => state.app);
    // const router = useRouter();
    const dispatch = useDispatch()

    const [screenWidth, setScreenWidth] = useState(0);

    const trackList = useSelector(state => state.trackList);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [scroll, setScroll] = useState(0);
    const scrollContainerRef = useRef(null);

    // const audioRef = useRef(null);
    // const { audioLink, isPlaying, analyser, connected, volume } = useSelector(state => state.audioPlayer)


    // useEffect(() => {
    //     const audio = audioRef.current;
    //     if (audio) {
    //         audio.volume = volume; // Set the audio element's volume
    //     }
    // }, [volume]);

    // useEffect(() => {

    //     const audio = audioRef.current;
    //     const setAudioContext = () => {
    //         if (!connected) {
    //             let AudioContext = window.AudioContext || window.webkitAudioContext
    //             let audioCtx = new AudioContext();
    //             let analyser = audioCtx.createAnalyser();
    //             let source = audioCtx.createMediaElementSource(audio);
    //             source.connect(analyser);
    //             source.connect(audioCtx.destination);
    //             dispatch(setAnalyser(analyser))
    //             dispatch(setConnected(true))
    //         }

    //     }
    //     if (audio) {
    //         // Set the audio source only if it's different from the current source
    //         if (audio.src !== audioLink) {
    //             audio.src = audioLink;
    //             setAudioContext()
    //         }

    //         // Play or pause the audio based on the isPlaying state
    //         if (isPlaying) {
    //             audio.play();
    //         } else {
    //             audio.pause();
    //         }
    //     }
    // }, [audioLink, isPlaying]);

    // useEffect(() => {
    //     const audio = audioRef.current;
    //     audio.src = ""
    //     const handleTimeUpdate = () => {
    //         dispatch(setCurrentTime(audio.currentTime));
    //     };
    //     const handleLoadedMetadata = () => {
    //         dispatch(setDuration(audio.duration));
    //     };
    //     const handleAudioEnd = () => {
    //         dispatch(setCurrentTime(0));
    //         dispatch(setIsPlaying(false));
    //         audio.pause()
    //     };
    //     if (audio) {
    //         audio.addEventListener('timeupdate', handleTimeUpdate);
    //         audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    //         audio.addEventListener('ended', handleAudioEnd);
    //         // Trigger load to ensure metadata is loaded
    //         audio.load();
    //     }
    //     return () => {
    //         if (audio) {
    //             audio.removeEventListener('timeupdate', handleTimeUpdate);
    //             audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    //             audio.removeEventListener('ended', handleAudioEnd);
    //             dispatch(resetPlayer())
    //         }
    //     };
    // }, []);

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



    return (
        <div className="tab-content">
            {/* <div className="tab-content-details">
                <TracksDetails />
            </div> */}
            {/* <audio ref={audioRef} crossOrigin="anonymous" preload="auto" />
            {audioLink && <TimeLine audioRef={audioRef} />} */}

            <div className="tab-content-track" ref={scrollContainerRef}>

                <InfiniteList
                    resultType="track-view-list"
                    limit={20}
                    contained={screenWidth > 500 ? true : false}
                    scrollValue={scroll}
                    sortProperty={trackList.sortProperty}
                    order={trackList.order}
                    criteria={trackList.criteria}
                    // identifier={this.props.query.folder}
                    searchCollection={trackSearch}
                    updateCollectionStats={(count, total) => {
                        setCount(count)
                        setTotal(total)
                        dispatch(trackListUpdateStats({ count: count, total: total }))

                    }}
                    loadCollectionItem={trackItem}

                />


            </div>

            <CollectionInfo
                count={count}
                total={total}
                drawerType="track-collection-settings"
            />

        </div>
    );
}

export default TracksTab;
