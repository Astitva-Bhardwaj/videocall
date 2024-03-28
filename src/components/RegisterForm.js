import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; 
import { useHistory } from 'react-router-dom'// Import the CSS file

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            history.push('/login');
            await axios.post('http://localhost:8081/user/register', formData); 
            console.log('User registered successfully!');
        
            // Redirect or show a success message as needed
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default RegisterForm;
