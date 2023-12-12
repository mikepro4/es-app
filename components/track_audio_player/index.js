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
    togglePlayer,
    trackUpdateDuration,
    updateCollectionItem,
    shapeCalculateParamPercentage
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

    const [audioPercentage, setAudioPercentage] = useState(null);

    useEffect(() => {
      if(item?._id) {
        dispatch(shapeCalculateParamPercentage({
          field: "track",
          value: item._id,
          callback: (data) => {
            setAudioPercentage(data)
          }
        }))
      }
      
    }, [item]);


    useEffect(() => {
        if(item?.duration) {
            } else {
            if(duration && item?._id === trackId) {
                dispatch(trackUpdateDuration({
                    trackId: item._id,
                    duration: duration,
                    callback: (data) => {
                        dispatch(updateCollectionItem(item._id))
                    }
                }))
            }
        }
        return () => {
        };
    }, [duration]);

    useEffect(() => {

        return () => {
            dispatch(setCurrentTime(0))
        };
    }, []); 

    const handlePlay = () => {
        if (item && item?._id !== trackId ) {
            dispatch(setAudioId(item._id));
            dispatch(setAudioName(item.name));
            dispatch(setAudioLink(item.songLink));
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
        dispatch(setAudioId(item._id));
        dispatch(setAudioName(item.name));
        dispatch(setAudioLink(item.songLink));
        dispatch(setIsPlaying(true));
        // }, 1000)

    };


    if(!item ) {
        return null;
    }

    return (
        <div 
            className={classNames({
                "track-audio-player": true,
            })}
        >
            <div className="track-player-left">
                {item.album?.imageLink && <img src={item.album?.imageLink} />}
                <div 
                    className={classNames({
                        "track-controls-container": true,
                        "playing": isPlaying && trackId === item._id
                    })}
                    onClick={() => handlePlay()}
                    // onTouchStart={() => handlePlay()}
                >
                    <Button
                        icon={isPlaying && trackId === item._id ? "pause" : "play"}
                        small={true} 
                    />
                </div>
            </div>

            <div className="track-player-right">
                <div 
                    className="track-player-title"
                    onClick={() => {
                        
                        router.push({
                            pathname: '/music',
                            query: { tab: 1, trackId: item._id },
                        }, undefined, { shallow: true })
                        dispatch(togglePlayer({
                            playerOpen: false,
                            playerData: null
                        }))
                    }}
                >
                    <div className="track-player-title-container">
                        {item.name}
                    </div>

                    <div className="track-player-percentage-container">
                        {audioPercentage && <span
                            data-tooltip-id="my-tooltip" 
                            data-tooltip-content={`${audioPercentage?.count} other shapes have this track`}
                        >
                            {audioPercentage?.percentage}%
                        </span>}
                    </div>
                </div>

                <div 
                    className="track-timeline-container"
                    ref={timelineRef}
                    onClick={handleProgressBarClick}
                    // onMouseMove={onMouseMove}
                    // onMouseLeave={onMouseLeave}
                >
                    <div className="track-timeline">
                        {trackId === item._id && <div className="track-timeline-progress" style={{ width: `${(currentTime * 100) / item.duration}%` }} />}
                    </div>
                </div>

                <div className="track-player-time">
                    <div className="track-player-current-time">
                        {currentTime && trackId === item._id ? formatTime(currentTime): "0:00"}
                    </div>

                    <div className="track-player-divider">/</div>

                    <div className="track-player-duration">
                        {item.duration && formatTime(item.duration)}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default TrackAudioPlayer;
