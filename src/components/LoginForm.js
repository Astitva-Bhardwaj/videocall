import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/user/login', new URLSearchParams({
                username: formData.username,
                password: formData.password
            }));
            console.log('User logged in successfully!', response.data);
            history.push('/meeting');
            // Redirect or show a success message as needed
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container">
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default LoginForm;
