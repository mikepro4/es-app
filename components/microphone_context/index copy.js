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
    }, [connected, isMicrophoneListen, dispatch]);

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
    }, [isMicrophoneListen, dispatch]);

    const toggleMicrophone = useCallback(() => {
        dispatch(toggleMicrophoneAction());
    }, [dispatch]);

    return { toggleMicrophone, isMicrophoneListen };
};

// import React, { useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     setMicrophoneAnalyser,
//     toggleMicrophone,
//     setMicrophoneConnected,
//     clearMicrophoneState
// } from "@/redux";

// const MicrophoneInput = () => {
//     const dispatch = useDispatch();
//     const microphoneRef = useRef(null);
//     const { isMicrophoneListen, microphoneAnalyser, connected } = useSelector(state => state.microphoneListen);
//     console.log("microphoneAnalyser", microphoneAnalyser)


//     useEffect(() => {
//         if (!connected && isMicrophoneListen) {
//             const handleMicrophoneSetup = async () => {
//                 if (!navigator.mediaDevices) {
//                     console.error("MediaDevices not supported in this browser.");
//                     return;
//                 }

//                 try {
//                     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//                     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//                     const source = audioContext.createMediaStreamSource(stream);
//                     const analyser = audioContext.createAnalyser();

//                     source.connect(analyser);

//                     dispatch(setMicrophoneAnalyser(analyser));
//                     dispatch(setMicrophoneConnected(true));

//                     microphoneRef.current = stream;
//                 } catch (error) {
//                     console.error("Error accessing the microphone:", error);
//                 }
//             };

//             handleMicrophoneSetup();
//         }
//     }, [connected, isMicrophoneListen, dispatch]);


//     useEffect(() => {
//         if (microphoneRef.current) {
//             if (isMicrophoneListen) {

//                 const audioStream = microphoneRef.current;

//                 console.log("Microphone listening started", audioStream);
//             } else {
//                 // Logic to stop listening
//                 microphoneRef.current.getTracks().forEach(track => track.stop());
//                 microphoneRef.current = null;
//                 dispatch(clearMicrophoneState());
//                 console.log("Microphone listening stopped");
//             }
//         }
//     }, [isMicrophoneListen, dispatch]);


//     return (
//         <button onClick={() => dispatch(toggleMicrophone())}>
//             {!isMicrophoneListen ? "Listen" : "Listening"}
//         </button>
//     );
// };

// export default MicrophoneInput;

// useEffect(() => {
//     let animationFrameId;

//     const tick = () => {
//         if (microphoneAnalyser && isMicrophoneListen) {
//             // Get the data from the analyser
//             const dataArray = new Uint8Array(microphoneAnalyser.frequencyBinCount);
//             microphoneAnalyser.getByteFrequencyData(dataArray);

//             // You can dispatch this data to your Redux store or set it in local state
//             // For example, using local state would look like this:
//             // setAnalyserData(dataArray); // You would need to create this state with useState

//             // Log the data array
//             console.log(dataArray);

//             // Continue the loop
//             animationFrameId = requestAnimationFrame(tick);
//         }
//     };

//     // Start the loop
//     tick();

//     // Clean up
//     return () => {
//         cancelAnimationFrame(animationFrameId);
//     };
// }, [isMicrophoneListen, microphoneAnalyser]);