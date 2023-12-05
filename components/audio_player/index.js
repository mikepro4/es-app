import React, { useRef, useState, useEffect } from 'react'
import TimeLine from "./TimeLine"
import { setCurrentTime, setDuration, setAnalyser, setConnected, resetPlayer, setAudioLink } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from "@blueprintjs/core";
import { Icon as PlayBtn } from "@blueprintjs/core";

import classNames from 'classnames';




const AudioPlayer = ({ link, audioRef }) => {
    const { currentTime, duration, connected, analyser } = useSelector((state) => state.audioPlayer);
    const [isPlaying, setIsPlaying] = useState(false)
    const state = useSelector((state) => state.audioPlayer);
    console.log("analyser", analyser)


    const dispatch = useDispatch()
    const audio = audioRef?.current;


    const isSafari = () => {
        return typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
    };
    console.log("isSafari", isSafari())



    useEffect(() => {


        // const handleTimeUpdate = () => {
        //     dispatch(setCurrentTime(audio.currentTime));
        // };


        // const handleLoadedMetadata = () => {
        //     dispatch(setDuration(audio.duration));
        // };

        // const handleAudioEnd = () => {
        //     dispatch(setCurrentTime(0));
        //     audio.pause()
        // };

        // if (audio) {
        //     audio.addEventListener('timeupdate', handleTimeUpdate);
        //     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        //     audio.addEventListener('ended', handleAudioEnd);

        //     // Trigger load to ensure metadata is loaded
        //     audio.load();
        // }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('ended', handleAudioEnd);
                dispatch(resetPlayer())
            }
        };
    }, []);

    console.log(link.uri);
    console.log("audioRef",);
    console.log("duration", duration);
    console.log("analyser", analyser);
    console.log("currentTime", currentTime, "duration", duration);



    const play = () => {
        console.log("play audio")
        dispatch(setAudioLink(link))



        // Set up event listeners
        const handleTimeUpdate = () => {
            dispatch(setCurrentTime(audio.currentTime));
        };

        const handleLoadedMetadata = () => {
            dispatch(setDuration(audio.duration));
        };

        const handleAudioEnd = () => {
            dispatch(setCurrentTime(0));
            audio.pause();
            setIsPlaying(false); // Update playing state
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleAudioEnd);
        audio.load();
        if (!connected) {

            dispatch(setConnected(true));
            const analyserConnect = () => {
                const context = new (window.AudioContext || window.webkitAudioContext || false)();
                const analyser = context.createAnalyser();
                const audioSrc = context.createMediaElementSource(audioRef.current);



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
            <p>{link.id}</p>

            <div className="track-view-list__play_btn" onClick={() => { !isPlaying ? play() : stop(); setIsPlaying(!isPlaying) }}>
                {!isPlaying ? <PlayBtn icon="play" iconSize={20} /> : <PlayBtn icon="pause" iconSize={20} />}
            </div>

        </div>
    )
}

export default AudioPlayer