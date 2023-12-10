import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import { 
    togglePlayPause, 
    setAudioId, 
    setAudioName, 
    setIsPlaying, 
    setAudioLink, 
    setCurrentTime, 
    seekAudioPlayer,
    togglePlayer
} from '@/redux';
import { formatTime } from '@/utils/timeFormatter';

function TrackAudioPlayer({
    item
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const timelineRef = useRef(null);
    const dispatch = useDispatch();
    const { 
        isPlaying, 
        audioName, 
        playerControls, 
        duration, 
        currentTime,
        volume, 
        seek,
        id: trackId 
    } = useSelector(state => state.audioPlayer)


    useEffect(() => {
        if(item?.track?.duration) {
        } else {
          if(duration) {
            dispatch(trackUpdateDuration({
              trackId: item.track._id,
              duration: duration,
            }))
          }
        }
        return () => {};
    }, [duration]);

    useEffect(() => {

        return () => {
            
        };
    }, []); 

    const handlePlay = () => {
        if (item && item.track && item.track._id !== trackId ) {
            dispatch(setAudioId(item.track._id));
            dispatch(setAudioName(item.track.name));
            dispatch(setAudioLink(item.track.songLink));
            dispatch(setIsPlaying(true));
        } else {
            dispatch(togglePlayPause());
        }
    };

    const handleProgressBarClick = (event) => {
        const box = timelineRef.current.getBoundingClientRect();
        const relX = event.pageX - box.left;
        const progressBarPercent = relX * 100 / box.width;
        const seekSeconds = progressBarPercent * duration / 100;
        dispatch(setCurrentTime(seekSeconds));
        dispatch(seekAudioPlayer(seekSeconds));

        // setTimeout(() => {
        dispatch(setAudioId(item.track._id));
        dispatch(setAudioName(item.track.name));
        dispatch(setAudioLink(item.track.songLink));
        dispatch(setIsPlaying(true));
        // }, 1000)

    };


    if(!item) {
        return null;
    }

    return (
        <div 
            className={classNames({
                "track-audio-player": true,
            })}
        >
            <div className="track-player-left">
                {item.track.album.imageLink && <img src={item.track.album.imageLink} />}
                <div 
                    className={classNames({
                        "track-controls-container": true,
                        "playing": isPlaying
                    })}
                >
                    <Button
                        icon={isPlaying ? "pause" : "play"}
                        small={true} 
                        onClick={() => handlePlay()}
                    />
                </div>
            </div>

            <div className="track-player-right">
                <div 
                    className="track-player-title"
                    onClick={() => {
                        
                        router.push({
                            pathname: '/music',
                            query: { ...router.query, tab: 1, trackId: item.track._id },
                        }, undefined, { shallow: true })
                        dispatch(togglePlayer({
                            playerOpen: false,
                            playerData: null
                        }))
                    }}
                >
                    {item.track.name}
                </div>

                <div 
                    className="track-timeline-container"
                    ref={timelineRef}
                    onClick={handleProgressBarClick}
                    // onMouseMove={onMouseMove}
                    // onMouseLeave={onMouseLeave}
                >
                    <div className="track-timeline">
                        <div className="track-timeline-progress" style={{ width: `${(currentTime * 100) / item.track.duration}%` }} />
                    </div>
                </div>

                <div className="track-player-time">
                    <div className="track-player-current-time">
                        {currentTime ? formatTime(currentTime): "0:00"}
                    </div>

                    <div className="track-player-duration">
                        {item.track.duration && formatTime(item.track.duration)}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default TrackAudioPlayer;
