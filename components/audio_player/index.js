
import TimeLine from '@/components/audio_player/TimeLine'
import AudioControls from '../audio-controls'
import { trackSearch, trackItem, trackListUpdateStats, resetPlayer, setCurrentTime, setDuration, setIsPlaying, setAnalyser, setConnected } from "@/redux"
import { useSelector, useDispatch } from 'react-redux'
import React, { useRef, useEffect } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const dispatch = useDispatch()
    const { audioLink, isPlaying, analyser, connected, volume, playerControls } = useSelector(state => state.audioPlayer)


    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume; // Set the audio element's volume
        }
    }, [volume]);

    useEffect(() => {

        const audio = audioRef.current;
        const setAudioContext = () => {
            if (!connected) {
                let AudioContext = window.AudioContext || window.webkitAudioContext
                let audioCtx = new AudioContext();
                let analyser = audioCtx.createAnalyser();
                let source = audioCtx.createMediaElementSource(audio);
                source.connect(analyser);
                source.connect(audioCtx.destination);
                dispatch(setAnalyser(analyser))
                dispatch(setConnected(true))
            }

        }
        if (audio) {
            // Set the audio source only if it's different from the current source
            if (audio.src !== audioLink) {
                audio.src = audioLink;
                setAudioContext()
            }

            // Play or pause the audio based on the isPlaying state
            if (isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [audioLink, isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        audio.src = ""
        const handleTimeUpdate = () => {
            dispatch(setCurrentTime(audio.currentTime));
        };
        const handleLoadedMetadata = () => {
            dispatch(setDuration(audio.duration));
        };
        const handleAudioEnd = () => {
            dispatch(setCurrentTime(0));
            dispatch(setIsPlaying(false));
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
    return (
        <>
            <audio ref={audioRef} crossOrigin="anonymous" preload="auto" />
            {audioLink && <TimeLine audioRef={audioRef} />}
            {playerControls && <AudioControls />}
        </>
    )
}

export default AudioPlayer