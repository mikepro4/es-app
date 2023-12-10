import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";
import PlayBtn from "@/components/play-btn";


import { togglePlayer, toggleNoRedirect, setAudioLink, setAudioId, togglePlayPause, setIsPlaying, setAudioName } from "@/redux";
//import { Icon } from "@blueprintjs/core";
import TrackActionsView from "@/components/collection_actions/trackActions";
import TrackAudioPlayer from "@/components/track_audio_player";

import Button from "@/components/button";

import Icon from "@/components/icon";

function TrackListView({
    item,

}) {
    // const [loading, setLoading] = useState(false);
    // const [isPlaying, setIsPlaying] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const { audioLink, isPlaying, id: trackId } = useSelector(state => state.audioPlayer)
    const state = useSelector(state => state.audioPlayer)
    const isCurrentTrackPlaying = item._id === trackId && isPlaying;
    const handlePlay = () => {
        if (item._id !== trackId) {
            dispatch(setAudioId(item._id));
            dispatch(setAudioName(item.name));
            dispatch(setAudioLink(item.songLink));
            dispatch(setIsPlaying(true));
        } else {
            dispatch(togglePlayPause());
        }
    };

    //"track-view-list-container"
    // console.log("audioRefTrack", audioRef)
    // console.log("itemTrack", item)
    // console.log("audioState", state)

    return (
        <div className={classNames({
            "track-view-list-container": true,
            "track-view-list-container__active": item._id === trackId
        })}
        >

            
            <TrackAudioPlayer 
                item={item}
            />

            {/* <TrackActionsView
                item={item}
            /> */}



        </div>
    );
}

export default TrackListView;
