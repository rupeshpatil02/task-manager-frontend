import React, { useState, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../../assets/images/backgroundimage.jpg"; // Adjust the path as necessary
import "../../assets/styles/Signup.css"; // Adjust the path as necessary
import { resetPassword, sendOtp } from "../../services/users.api";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const otpData = { email };
      const response = await sendOtp(otpData);
      if (response.data.code === 200) {
        setOtpSent(true);
      } else if (response.data.code === 404) {
        setErrorMessage(response.data.status);
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = { email, otp, newPassword };
      const response = await resetPassword(data);
      if (response.data.code === 200) {
        setSuccessMessage(response.data.status);
        setTimeout(() => {
          // window.location.href = '/login';
        }, 2000);
      }

      if (response.data.code === 402 || 403 || 500) {
        setErrorMessage(response.data.status);
      }
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div
      className="container-fluid position-relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "140vh", // Adjust width as needed
      }}
    >
      <div
        className="position-absolute top-0 start-0 bottom-0 end-0"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      ></div>
      <div
        className="row justify-content-center align-items-center"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <div className="col-md-7">
          <div
            className="card"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "20px",
            }}
          >
            <div className="card-body">
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errorMessage && (
                    <div
                      className="error-message"
                      style={{
                        color: "red",
                        marginBottom: "10px",
                        marginLeft: "40%",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  {!successMessage && errorMessage && (
                    <div
                      className="error-message"
                      style={{
                        color: "red",
                        marginBottom: "10px",
                        marginLeft: "35%",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div
                      className="error-message"
                      style={{
                        color: "green",
                        marginBottom: "10px",
                        marginLeft: "27%",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
