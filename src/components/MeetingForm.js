import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
const MeetingForm = () => {
    const [callId, setCallId] = useState('');
    const [joinCallId, setJoinCallId] = useState('');
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/user/video/create', { callId });
            console.log('Video call created successfully!', response.data);
            // Redirect or show a success message as needed
            history.push('/meeting_button');
        } catch (error) {
            console.error('Error creating video call:', error);
        }
    };

    const handleJoinCallSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to join the video call
            const response = await axios.post('http://localhost:8081/user/video/join/call', { joinCallId });
            console.log('Joined video call successfully!', response.data);
            // Redirect or show a success message as needed
            history.push('/camera');
        } catch (error) {
            console.error('Error joining video call:', error);
        }
    };

    const handleChange = (e) => {
        setCallId(e.target.value);
    };
    const handleJoinCallChange = (e) => {
        setJoinCallId(e.target.value);
    };


    return (
        <div className="container">
            <h1>Create Video Call</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="createCallId">Call ID:</label>
                    <input type="text" id="createCallId" name="callId" value={callId} onChange={handleChange} required />
                </div>
                <input type="submit" value="Create Call" />
            </form>
            <h1>Join Video Call</h1>
            <form onSubmit={handleJoinCallSubmit}>
                <div className="form-group">
                    <label htmlFor="joinCallId">Enter Call ID:</label>
                    <input type="text" id="joinCallId" name="joinCallId" value={joinCallId} onChange={handleJoinCallChange} required />
                </div>
                <input type="submit" value="Join Call" />
            </form>
        </div>
    );
};

export default MeetingForm;
