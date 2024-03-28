import React, { useState, useEffect } from 'react';
import './CameraAccess.css'
const CameraAccessReact = () => {
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
    }, [stream]);

    const toggleMic = () => {
        setIsMicOn((prev) => !prev);

        if (stream) {
            const audioTracks = stream.getAudioTracks();
            audioTracks.forEach((track) => {
                track.enabled = isMicOn;
            });
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <video
                id="videoElement"
                autoPlay
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRadius: '8px', // Add border-radius for a rounded video display
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)', // Add box shadow for a subtle depth effect
                }}
            ></video>
            <button
                className="micButton"
                id="micToggleButton"
                onClick={toggleMic}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '10px',
                    backgroundColor: '#ffffff',
                    color: '#333333',
                    border: '1px solid #cccccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                {isMicOn ? 'Mic On' : 'Mic Off'}
            </button>
        </div>
    );
};

export default CameraAccessReact;
