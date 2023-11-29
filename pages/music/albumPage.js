import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";

import AlbumActionsView from "@/components/collection_actions/albumActions";

import { albumUpdateItem, updateCollectionItem, albumItem, albumUpdateManyItems } from "@/redux";


function AlbumPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [album, setAlbum] = useState(false);

    const fetchAlbum = () => {
        dispatch(albumItem({
            id: router.query.albumId,
            callback: (data) => {
                console.log(data);
                setAlbum(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
                if(data.code) {
                    setCodeItems(data.code)
                }
            }
        }))
    }

    useEffect(() => {
        fetchAlbum()

        return () => {

        };
    }, []);

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

     

    return (
        <div className="music-page-container album-page-container">

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

            
            
           
        </div>
    );
}

export default AlbumPageContainer;
