import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, setCurrentTime, setDuration, setVolume, setAudioContext, setAnalyser } from '@/redux';
import TimeLine from './TimeLine';



const AudioPlayer = ({ links }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [audioContext, setAudioContextState] = useState(null);

    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const { playing, currentTime, volume, duration } = useSelector((state) => state.audioPlayer);
    const state = useSelector((state) => state.audioPlayer);
    console.log("state", state)
    useEffect(() => {
        if (currentTrackIndex !== null) {
            loadTrack(currentTrackIndex);
        }
    }, [currentTrackIndex]);


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
        const audio = audioRef.current;
        if (playing && currentTrackIndex !== null) {
            const analyzer = () => {
                // Check if AudioContext is already created
                if (!audioContext) {
                    const AudioContext = new (window.AudioContext || window.webkitAudioContext)();

                    const analyser = AudioContext.createAnalyser();
                    const audioSrc = AudioContext.createMediaElementSource(audio);

                    setAudioContextState(AudioContext);
                    audioSrc.connect(analyser);
                    analyser.connect(AudioContext.destination);

                    // Dispatch actions to set AudioContext and Analyser in Redux
                    dispatch(setAudioContext(AudioContext));
                    dispatch(setAnalyser(analyser));

                    // Set audio context state
                    setAudioContextState(AudioContext)

                    audio.src = links[0];

                    // Dispatch action to set AudioContext in Redux
                    dispatch(setAudioContext(AudioContext));
                }
            }
            analyzer()
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Playback started successfully
                    })
                    .catch(error => {
                        console.error('Playback failed:', error);
                        // Handle playback failure
                    });
            }
        } else {
            // audio.pause();
        }
    }, [playing, currentTrackIndex]);


    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const loadTrack = (index) => {
        const audio = audioRef.current;
        if (audio) {
            audio.src = links[index].uri;
            audio.load();
            dispatch(togglePlay(true));
        }
    };

    const selectTrack = (index) => {



        if (currentTrackIndex !== index) {
            setCurrentTrackIndex(index);
            dispatch(setCurrentTime(0));
            dispatch(togglePlay(false));
        } else {
            dispatch(togglePlay(!playing));
        }
    };

    const handleVolumeChange = (e) => {
        dispatch(setVolume(e.target.value));
    };

    return (
        <div>
            <audio ref={audioRef} crossOrigin="anonymous" />
            <input type="range" min="0" max="0.8" step="0.01" value={volume} onChange={handleVolumeChange} />
            <TimeLine currentTime={currentTime} duration={duration} audioRef={audioRef} />
            <div>
                {links.map((track, index) => (
                    <button key={track.id} onClick={() => selectTrack(index)}>
                        {currentTrackIndex === index && playing ? 'Pause' : 'Play'} Track {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AudioPlayer;


