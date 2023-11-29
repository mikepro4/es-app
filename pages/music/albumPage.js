import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";

import AlbumActionsView from "@/components/collection_actions/albumActions";

import { albumUpdateItem, updateCollectionItem, albumItem, albumUpdateManyItems, trackSearch, trackItem } from "@/redux";

import InfiniteList from '@/components/infinite_list'


function AlbumPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [album, setAlbum] = useState(false);
    const scrollContainerRef = useRef(null); 
    const [screenWidth, setScreenWidth] = useState(0);

    const fetchAlbum = () => {
        dispatch(albumItem({
            id: router.query.albumId,
            callback: (data) => {
                console.log(data);
                setAlbum(data)
                dispatch(updateCollectionItem(null))
            }
        }))
    }

    useEffect(() => {
        fetchAlbum()

        return () => {

        };
    }, []);

    const handleScroll = () => {
        const position = scrollContainerRef.current.scrollTop
        setScroll(position)
    };

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        if (app.updateCollectionItem && app.updateCollectionItem == album?._id) {
            fetchAlbum()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.albumId && album?._id && router.query.albumId !== album?._id) {
            fetchAlbum()
        }
    }, [router]);

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
        <div className="music-page-container album-page-container" ref={scrollContainerRef}>

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
                                query: { ...router.query, albumId: null },
                            }, undefined, { shallow: true })
                        }
                    }
                    />

                </div>

                <div className="music-page-container-header-right">
                <AlbumActionsView
                        item={album}
                    />
                </div>
            </div>

            <h1>{album && album.name} </h1>

            <InfiniteList
                resultType="track-view-list"
                limit={50}
                contained={screenWidth > 500 ? true : false}
                scrollValue={scroll}
                sortProperty="created"
                order="-1"
                criteria={{ album: album?._id }}
                // identifier={this.props.query.folder}
                searchCollection={trackSearch}
                updateCollectionStats={(count, total) => {
                }}
                loadCollectionItem={trackItem}
            />

            
            
           
        </div>
    );
}

export default AlbumPageContainer;
