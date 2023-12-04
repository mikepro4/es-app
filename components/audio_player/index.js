import React, { useRef, useState, useEffect } from 'react'
import TimeLine from "./TimeLine"
import { setCurrentTime, setDuration, setAnalyser, setConnected, resetPlayer } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from "@blueprintjs/core";
import classNames from 'classnames';




const AudioPlayer = ({ links }) => {
    const { currentTime, duration, connected, analyser } = useSelector((state) => state.audioPlayer);
    const state = useSelector((state) => state.audioPlayer);
    console.log("analyser", analyser)


    const dispatch = useDispatch()

    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            dispatch(setCurrentTime(audio.currentTime));
        };


        const handleLoadedMetadata = () => {
            dispatch(setDuration(audio.duration));
        };

        const handleAudioEnd = () => {
            dispatch(setCurrentTime(0));
            audio.pause()
        };

        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', handleAudioEnd);

            // Trigger load to ensure metadata is loaded
            audio.load();
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('ended', handleAudioEnd);
                dispatch(resetPlayer())
            }
        };
    }, []);

    console.log(links[0].uri);
    console.log("audioRef",);
    console.log("analyser", analyser);
    console.log("currentTime", currentTime, "duration", duration);



    const play = () => {
        console.log("play audio")
        if (!connected) {
            dispatch(setConnected(true));
            const analyserConnect = () => {
                const context = new (window.AudioContext || window.webkitAudioContext || AudioContext)();
                const analyser = context.createAnalyser();
                const audioSrc = context.createMediaElementSource(audioRef.current);

                audioRef.current.addEventListener('loadedmetadata', () => {
                    dispatch(setDuration(audioRef.current.duration));
                });

                audioSrc.connect(analyser);
                audioSrc.connect(context.destination);
                dispatch(setAnalyser(analyser));
            }
            analyserConnect()
        }
        audioRef.current.play()
    }

    const stop = () => {
        console.log("stop audio")
        audioRef.current.pause()

    }



    return (
        <div>
            <p>AudioPlayer</p>
            <audio
                src={links[0].uri}
                controls
                ref={audioRef}
                crossOrigin="anonymous"
            />
            <TimeLine currentTime={currentTime} duration={duration} audioRef={audioRef} />
            <div
                className={classNames({
                    "shape-play-button-container": true,
                    "small": false,
                })}
            >
                <Icon icon="play" />
            </div>
            <button onClick={play} >Play</button>
            <button onClick={stop} >Pause</button>
        </div>
    )
}

export default AudioPlayer