import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { Link } from "react-router-dom"; // Import Link from React Router
import logo from "../../assets/images/logo.png";
import "../../assets/styles/sideNavBar.css"; // Import the CSS file

const Sidebar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleOptionClick = (option: string) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
    }
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 sidebar-container">
      <Link
        to="/tasks"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <img
          src={logo}
          alt="Company Logo"
          width="100"
          height="100"
          className="logo-img"
        />
      </Link>
      <hr
        style={{
          border: "none",
          borderBottom: "2px solid black",
          marginBottom: "20px",
        }}
      />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/tasks"
            className={`nav-link ${selectedOption === "tasks" ? "active" : ""}`}
            onClick={() => handleOptionClick("tasks")}
          >
            <i className="bi bi-grid-3x3-gap"></i> Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/starred-tasks"
            className={`nav-link ${
              selectedOption === "starred-tasks" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("starred-tasks")}
          >
            <i className="bi bi-grid-3x3-gap"></i> Starred Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/completed-tasks"
            className={`nav-link ${
              selectedOption === "completed" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("completed")}
          >
            <i className="bi bi-grid-3x3-gap"></i> Completed Tasks
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/task-analysis"
            className={`nav-link ${
              selectedOption === "analyze" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("analyze")}
          >
            <i className="bi bi-grid-3x3-gap"></i> Task analysis
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`nav-link ${
              selectedOption === "profile" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("profile")}
          >
            <i className="bi bi-person"></i> Profile
          </Link>
        </li>
      </ul>
      <ul className="nav nav-pills flex-column">
        <hr
          style={{
            border: "none",
            borderBottom: "1px solid black",
            marginBottom: "20px",
          }}
        />
        <li>
          <a href="/logout" className="nav-link text-nowrap logout-link">
            <i className="bi bi-box-arrow-right"></i> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
