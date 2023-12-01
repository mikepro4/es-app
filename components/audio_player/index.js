import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, setCurrentTime, setDuration, setVolume } from '@/redux';
import TimeLine from './TimeLine';

const AudioPlayer = ({ link }) => {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const { playing, currentTime, volume, duration } = useSelector((state) => state.audioPlayer);

    console.log(duration)
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
            dispatch(togglePlay(false));
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
    }, [dispatch]);

    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause();
    }, [playing]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const handlePlayPauseClick = () => {
        dispatch(togglePlay());
    };

    const handleVolumeChange = (e) => {
        dispatch(setVolume(e.target.value));
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        dispatch(setCurrentTime(newTime));
    };

    return (
        <div>
            <audio ref={audioRef} src={link} />
            <button onClick={handlePlayPauseClick}>{playing ? 'Pause' : 'Play'}</button>
            <input type="range" min="0" max="0.8" step="0.01" value={volume} onChange={handleVolumeChange} />
            {/* <input type="range" min="0" max={audioRef.current?.duration || 0} value={currentTime} onChange={handleTimeChange} /> */}
            <TimeLine currentTime={currentTime} duration={duration} audioRef={audioRef} />
        </div>
    );
};

export default AudioPlayer;