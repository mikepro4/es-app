import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";
import ImageUpload from "@/components/image_upload";

import AlbumActionsView from "@/components/collection_actions/albumActions";

import { shapeSearch, shapeItem, albumUpdateItem, updateCollectionItem, albumItem, albumUpdateManyItems, trackSearch, trackItem } from "@/redux";

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
    const [scroll, setScroll] = useState(0);

    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchAlbum = () => {
        if (router.query.albumId) {
            dispatch(albumItem({
                id: router.query.albumId,
                callback: (data) => {
                    console.log(data);
                    setAlbum(data)
                    dispatch(updateCollectionItem(null))
                }
            }))
        }
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

    const updateItemImage = (imageLink) => {
        dispatch(
            albumItem({
                id: album?._id,
                callback: (data) => {
                    dispatch(
                        albumUpdateItem({
                            data: {
                                ...data,
                                imageLink: imageLink,
                            },
                            callback: (data) => {
                                dispatch(updateCollectionItem(album?._id))
                            },
                        })
                    );
                },
            })
        );
    }

    return (
        <div className="music-page-container album-page-container" ref={scrollContainerRef}>
            <div className="music-page-center-container">
                <div className="music-page-container-header">

                    <div className="music-page-container-header-left">
                        <Button
                            label="All albums"
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

                <div className="music-page-album-container">
                    <div className="music-page-album-container-left">
                        <div
                            className={classNames("image-display-container", {
                                "hasImage": album && album.imageLink
                            })}
                        >
                            <div className="image-container">
                                {album && album.imageLink && <img src={album.imageLink} />}
                                {album && !album.imageLink && <Icon name="x" />}
                            </div>

                            <div className="image-container-overlay">
                                <ImageUpload
                                    callback={(data) => {
                                        console.log("IMAGE UPLOAD", data);
                                        updateItemImage(data)
                                    }}
                                />
                            </div>


                            {album && album.imageLink && <div className="image-remove">
                                <Button
                                    label="Delete image"
                                    small={true}
                                    wrap={true}
                                    minimal={true}
                                    onClick={() => {
                                        updateItemImage("")
                                    }}
                                />
                            </div>}

                        </div>
                    </div>

                    <div className="music-page-album-container-right">
                        <h1>{album && album.name}</h1>
                        <div className="album-artist">DCDNT</div>
                    </div>
                </div>

                {album && album._id && <InfiniteList
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
                />}

                {count > 0 && <div className="album-linked-shapes-container">
                    {count} shapes linked to album
                </div>}

                {album && <InfiniteList
                        resultType="shape-view-list"
                        limit={20}
                        contained={screenWidth > 500 ? true : false}
                        scrollValue={scroll}
                        sortProperty={"created"}
                        order={"-1"}
                        criteria={{
                            status: "approved",
                            album: album._id
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
    );
}

export default AlbumPageContainer;
