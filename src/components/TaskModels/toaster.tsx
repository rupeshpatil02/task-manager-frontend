// Toaster.jsx

import React from 'react';
import '../../assets/styles/toaster.css';

interface ToasterProps {
    message: string; // Specify the type of message as string
}

const Toaster: React.FC<ToasterProps> = ({ message }) => {
    return (
        <div className="toaster">
            {message}
        </div>
    );
};

export default Toaster;
