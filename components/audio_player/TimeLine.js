import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { formatTime } from '@/utils/timeFormatter';
import { togglePlay, setCurrentTime, togglePlayerControls } from '@/redux';
import Icon from '../icon';


const TimeLine = ({ audioRef }) => {
    const [hoverWidth, setHoverWidth] = useState(0);
    const timelineRef = useRef(null);
    const { duration, currentTime, playerControls } = useSelector(state => state.audioPlayer)
    const shapeOpen = useSelector(state => state.app.playerOpen)




    const dispatch = useDispatch();
    //const player = useSelector(state => state.player);
    //const { playing, currentTime, volume, duration } = useSelector((state) => state.audioPlayer);

    // const { playing, currentTime, volume, du } = useSelector((state) => state.audioPlayer);

    useEffect(() => {
        const handleResize = () => {
            // Update component state or perform any actions on resize
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getTimeline = () => {
        if (timelineRef.current) {
            const containerWidth = timelineRef.current.getBoundingClientRect().width;
            const timesAmount = containerWidth / 50;
            const timeInterval = duration / timesAmount;
            return Array.from({ length: timesAmount }, (_, i) => i * timeInterval);
        }
        return [];
    };

    const handleProgressBarClick = (event) => {
        const box = timelineRef.current.getBoundingClientRect();
        const relX = event.pageX - box.left;
        const progressBarPercent = relX * 100 / box.width;
        const seekSeconds = progressBarPercent * duration / 100;
        dispatch(setCurrentTime(seekSeconds));
        audioRef.current.currentTime = seekSeconds;
    };

    const calculateWidth = (event) => {
        const box = timelineRef.current.getBoundingClientRect();
        const relX = event.pageX - box.left;
        return (relX * 100 / box.width) * duration / 100;
    };

    const onMouseMove = (event) => {
        const hoverSeconds = calculateWidth(event);
        setHoverWidth(`${(hoverSeconds * 100) / duration}%`);
    };

    const onMouseLeave = () => {
        setHoverWidth(0);
    };

    const timeArray = getTimeline();
    const progressBarWidth = { width: `${(currentTime * 100) / duration}%` };
    const progressBarHoverWidth = { width: hoverWidth };

    return (
        <div
            className="timeline-container"
            ref={timelineRef}
            id="progressBar"
            onClick={handleProgressBarClick}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="progress-bar-wrapper">
                <div className="progress-bar" style={progressBarWidth} />
                <div className="progress-bar-hover" style={progressBarHoverWidth} />
            </div>
            <ul className="time-list">
                {timeArray.map((time, i) => (
                    <li className="time" key={i}>
                        <span>{formatTime(time)}</span>
                    </li>
                ))}
            </ul>
            {!shapeOpen &&
                <div onClick={(e) => { e.stopPropagation(); dispatch(togglePlayerControls()) }} className={classNames({ "timeline-props-icon": true, "timeline-props-icon__active": playerControls, })}>
                    <Icon name="audio-settings" />
                </div>}
        </div >
    );
};

export default TimeLine;