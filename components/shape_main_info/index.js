import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import { Icon } from "@blueprintjs/core";
import PlayBtn from "../play-btn";
import { togglePlayPause, setAudioId, setAudioName, setIsPlaying, setAudioLink } from '@/redux';


import { toggleDrawer } from "@/redux";

function ShapeMainInfo({
    item,
    small
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const appData = useSelector((state) => state.appData);
    const keyboard = useSelector((state) => state.keyboard);
    const { isPlaying, audioName, playerControls, volume, id: trackId } = useSelector(state => state.audioPlayer)
    const router = useRouter();
    const dispatch = useDispatch();
    const [track, setTrack] = useState(null);

    const handlePlay = () => {
        if (track && track._id !== trackId ) {
            dispatch(setAudioId(track._id));
            dispatch(setAudioName(track.name));
            dispatch(setAudioLink(track.songLink));
            dispatch(setIsPlaying(true));
        } else {
            dispatch(togglePlayPause());
        }
    };

    useEffect(() => {
        if(item && item.track) {
            let fetchedTrack = appData.tracks.find((t) => t._id === item.track)
            setTrack(fetchedTrack)
        }
    }, [item]);


    useEffect(() => {

        let lastKey = keyboard.activeKeys[keyboard.activeKeys.length - 1];
        if (lastKey === "SPACE") {
            handlePlay();
        }
        return () => {

        };
    }, [keyboard]);

    return (
        <div className="shape-main-info-container">
            {/* <div
                className={classNames({
                    "shape-play-button-container": true,
                    "small": small,
                })}
            >
                <Icon icon="play" />
            </div> */}
            {track && track._id && <PlayBtn
                mr
                round
                isCurrentTrackPlaying={item.track === trackId && isPlaying}
                handlePlay={() => handlePlay()}
            />}

            <div
                className={classNames({
                    "shape-name-container": true,
                    "small": small,
                })}

                onClick={() => {
                    dispatch(toggleDrawer({
                        drawerOpen: true,
                        drawerType: "shape-settings",
                        drawerData: item,
                    }));
                }}
            >
                <div className="shape-main-name">
                    {item?.name}
                </div>
                <div className="shape-from-name-container">
                    23.3% rarity

                    <span className="shape-from-name-divider">|</span>

                    <span className="shape-from-name">Common</span>
                </div>
            </div>



        </div>
    );
}

export default ShapeMainInfo;
