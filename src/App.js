import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import MeetingForm from './components/MeetingForm';
import MeetingButton from './components/MeetingButton';
import Camera from './components/Camera'; 
import ScreenSharing from './components/ScreenSharing';
const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/meeting" component={MeetingForm} />
                    <Route path="/meeting_button" component={MeetingButton} />
                    <Route path="/camera" component={Camera} />
                    <Route path="/screen_sharing" component={ScreenSharing} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
