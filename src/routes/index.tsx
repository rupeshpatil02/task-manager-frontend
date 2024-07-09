import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ForgotPassword, Login, Signup, ChangePassword,Logout } from './auth';
import { CompletedTasks, StarredTasks, TaskManager,Analyzer } from './task.routes';
import { Profile } from './profile.routes';



const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect the root URL to the login page */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ChangePassword />} />
                <Route path="/tasks" element={<TaskManager />} />
                <Route path="/starred-tasks" element={<StarredTasks />} />
                <Route path="/completed-tasks" element={<CompletedTasks />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/task-analysis" element={<Analyzer/>} />

                {/* Add more routes for other pages if needed */}
                {/* <Route path="/other-page" element={<OtherPageComponent />} /> */}
                {/* <Route path="/another-page" element={<AnotherPageComponent />} /> */}
                {/* Make sure to define routes for all your pages */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
