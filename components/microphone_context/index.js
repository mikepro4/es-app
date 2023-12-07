import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMicrophoneAnalyser, toggleMicrophone, setMicrophoneConnected, clearMicrophoneState } from "@/redux";

const MicrophoneInput = () => {
    const dispatch = useDispatch();
    const microphoneRef = useRef(null);
    const { isMicrophoneListen, microphoneAnalyser, connected } = useSelector(state => state.microphoneListen)

    console.log("microphoneAnalyser", microphoneAnalyser)
    useEffect(() => {
        const handleMicrophone = async () => {
            if (!navigator.mediaDevices) {
                console.error("MediaDevices not supported in this browser.");
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();

                // Connect the source to the analyser
                source.connect(analyser);
                // Optionally, connect the analyser to the destination if you want the audio to be audible
                // analyser.connect(audioContext.destination);

                dispatch(setMicrophoneAnalyser(analyser));

                // Save the stream to ref for future use
                microphoneRef.current = stream;
            } catch (error) {
                console.error("Error accessing the microphone:", error);
            }
        };

        if (isMicrophoneListen) {
            handleMicrophone();
        } else {
            if (microphoneRef.current) {
                microphoneRef.current.getTracks().forEach(track => track.stop());
                microphoneRef.current = null;
                dispatch(setMicrophoneAnalyser(null));
            }
        }

        return () => {
            if (microphoneRef.current) {
                microphoneRef.current.getTracks().forEach(track => track.stop());
                microphoneRef.current = null;
            }
            // Reset the microphone analyzer when the component unmounts
            dispatch(setMicrophoneAnalyser(null));
        };
    }, [isMicrophoneListen, dispatch]);



    return (
        <button onClick={() => dispatch(toggleMicrophone())}>{!isMicrophoneListen ? "Listen" : "Listening"}</button>
    );
};

export default MicrophoneInput;