import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import TracksDetails from "@/components/collectionControls/tracksDetails";
import InfiniteList from '@/components/infinite_list'

import { trackSearch, trackItem, trackListUpdateStats } from "@/redux"

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

    const audioRef = useRef(null);
    const { audioLink, isPlaying } = useSelector(state => state.audioPlayer)


    useEffect(() => {

        audioRef.current.src = audioLink;
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    }, [audioLink, isPlaying]);

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
            <audio ref={audioRef} crossOrigin="anonymous" />

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
                    audioRef={audioRef}
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
