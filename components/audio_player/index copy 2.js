import React, { useRef, useState, useEffect } from 'react'
import TimeLine from "./TimeLine"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTime, setDuration, setVolume, setAudioContext, setAnalyser } from '@/redux';


const AudioPlayer = ({ links }) => {


    const dispatch = useDispatch();
    const { currentTime, duration, volume, audioContext, analyser } = useSelector((state) => state.audioPlayer);


    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleAudioEnd = () => {
            setCurrentTime(0);
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
            setConnected(true)
            const analyserConnect = () => {
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = context.createAnalyser();
                const audioSrc = context.createMediaElementSource(audioRef.current);

                audioRef.current.addEventListener('loadedmetadata', () => {
                    setDuration(audioRef.current.duration);
                });

                audioSrc.connect(analyser);
                audioSrc.connect(context.destination);
                dispatch(setAnalyser(analyser))
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

            <button onClick={play} >Play</button>
            <button onClick={stop} >Pause</button>
        </div>
    )
}

export default AudioPlayer