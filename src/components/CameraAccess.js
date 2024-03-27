import React, { useEffect, useState } from 'react';
import './CameraAccess.css';
const CameraAccess = () => {
    const [isMicOn, setIsMicOn] = useState(true);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const initializeCamera = async () => {
            try {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(userMediaStream);
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        initializeCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]); // Include stream in the dependency array

    const toggleMic = () => {
        setIsMicOn((prev) => !prev);

        if (stream) {
            stream.getAudioTracks().forEach((track) => {
                track.enabled = !isMicOn;
            });
        }
    };

    return (
        <div id="videoContainer">
            <video id="videoElement" autoPlay></video>
            <button className="micButton" id="micToggleButton" onClick={toggleMic}>
                {isMicOn ? 'Mic On' : 'Mic Off'}
            </button>
        </div>
    );
};

export default CameraAccess;
