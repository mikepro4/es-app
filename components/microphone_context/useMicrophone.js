import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMicrophoneAnalyser,
    toggleMicrophone as toggleMicrophoneAction,
    setMicrophoneConnected,
    clearMicrophoneState
} from "@/redux";

export const useMicrophone = () => {
    const dispatch = useDispatch();
    const microphoneRef = useRef(null);
    const { isMicrophoneListen, connected } = useSelector(state => state.microphoneListen);

    useEffect(() => {
        if (!connected && isMicrophoneListen) {
            const handleMicrophoneSetup = async () => {
                if (!navigator.mediaDevices) {
                    console.error("MediaDevices not supported in this browser.");
                    return;
                }

                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const source = audioContext.createMediaStreamSource(stream);
                    const analyser = audioContext.createAnalyser();

                    source.connect(analyser);

                    dispatch(setMicrophoneAnalyser(analyser));
                    dispatch(setMicrophoneConnected(true));

                    microphoneRef.current = stream;
                } catch (error) {
                    console.error("Error accessing the microphone:", error);
                }
            };

            handleMicrophoneSetup();
        }
    }, [connected, isMicrophoneListen]);

    useEffect(() => {
        if (microphoneRef.current) {
            if (isMicrophoneListen) {
                console.log("Microphone listening started", microphoneRef.current);
            } else {
                // Logic to stop listening
                microphoneRef.current.getTracks().forEach(track => track.stop());
                microphoneRef.current = null;
                dispatch(clearMicrophoneState());
                console.log("Microphone listening stopped");
            }
        }
    }, [isMicrophoneListen]);

    const toggleMicrophone = useCallback(() => {
        dispatch(toggleMicrophoneAction());
    }, [dispatch]);

    return { toggleMicrophone, isMicrophoneListen };
};

