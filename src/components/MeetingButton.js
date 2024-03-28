import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MeetingButton = () => {
    const [cameraAccess, setCameraAccess] = useState('');
    const history = useHistory();

    const handleJoinNow = async (e) => {
        e.preventDefault();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraAccess('true');
            console.log('Camera access granted:', stream);
            history.push('/camera');
            
            // Submit the form programmatically here or use axios to send the data
            await axios.post('http://localhost:8081/user/video/join', { cameraAccess });
        } catch (error) {
            console.error('Error accessing camera or joining video call:', error);
            setCameraAccess('false');
            // Handle error gracefully, such as displaying an error message to the user
        }
    };

    const handlePresent = async (e) => {
        e.preventDefault();
        setCameraAccess('false');

        try {
            // Update the value of the hidden input dynamically to "true"
            const screenPresentInput = document.getElementById('screenPresentInput');
            if (screenPresentInput) {
                screenPresentInput.value = 'true'; // Set the value to "true"
                console.log('screenPresent value:', screenPresentInput.value); 
            }
            history.push('/screen_sharing');
            // Submit the form programmatically here or use axios to send the data
            await axios.post('http://localhost:8081/user/video/present', { screenPresent: 'true' });
            console.log('Screen presentation request sent successfully');
        
        } catch (error) {
            console.error('Error sending screen presentation request:', error);
            // Handle error gracefully, such as displaying an error message to the user
        }
    };

    return (
        <div className="container">
            <h1>Meeting Page</h1>
            <form onSubmit={handleJoinNow}>
                <input type="hidden" id="cameraAccessInput" name="cameraAccess" value={cameraAccess} />
                <button type="submit" id="joinNowBtn" name="joinNow" value="Join Now">Join Now</button>
            </form>

            <form id="presentForm" onSubmit={handlePresent}>
                {/* Update the value of the hidden input based on button click */}
                <input type="hidden" id="screenPresentInput" name="screenPresent" value="false" />
                <button type="submit" id="presentBtn" name="present" value="Present">Present</button>
            </form>
        </div>
    );  
};

export default MeetingButton;
