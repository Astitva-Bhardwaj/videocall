import React, { useEffect } from 'react';

const ScreenSharing = () => {
    useEffect(() => {
        const startSharingScreen = async () => {
            try {
                const sharedScreen = document.getElementById('sharedScreen');
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                sharedScreen.srcObject = stream;
                console.log('Screen sharing started:', stream);
            } catch (error) {
                console.error('Error sharing screen:', error);
            }
        };

        const startSharingBtn = document.getElementById('startSharingBtn');
        startSharingBtn.addEventListener('click', startSharingScreen);

        return () => {
            startSharingBtn.removeEventListener('click', startSharingScreen);
        };
    }, []);

    return (
        <div>
            <h1>Screen Sharing</h1>
            <video id="sharedScreen" autoPlay></video>
            <button id="startSharingBtn">Start Sharing</button>
        </div>
    );
};

export default ScreenSharing;
