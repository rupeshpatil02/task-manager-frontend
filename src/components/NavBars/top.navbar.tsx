import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import '../../assets/styles/topNav.css';

interface TopNavbarProps {
    onSearch: (searchTerm: string) => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onSearch }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="d-flex justify-content-center w-100">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <input className="form-control me-2 search-input" type="search" placeholder="                         Search tasks" aria-label="Search" onChange={(e) => onSearch(e.target.value)} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
