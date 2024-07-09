import React, { useState, ChangeEvent, useEffect } from 'react';
import '../../assets/styles/addTask.model.css';

interface ChangePasswordModalProps {
    showModal: boolean;
    onClose: () => void;
    onChangePassword: (currentPassword: string, newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ showModal, onClose, onChangePassword }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        switch (name) {
            case 'currentPassword':
                setCurrentPassword(value);
                break;
            case 'newPassword':
                setNewPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (): void => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        
        // Call the onChangePassword function with the current and new passwords
        onChangePassword(currentPassword, newPassword);
        
        // Reset the input fields and messages
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setSuccessMessage('Password changed successfully.');
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (errorMessage) {
            timeout = setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        } else if (successMessage) {
            timeout = setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [errorMessage, successMessage]);

    return (
        showModal ? (
            <div className="custom-modal" tabIndex={-2} role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog custom-modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Change Password</h4>
                            <button type="button" className="close-button" aria-label="Close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input type="password" id="currentPassword" className="form-control" name="currentPassword" value={currentPassword} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" id="newPassword" className="form-control" name="newPassword" value={newPassword} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" id="confirmPassword" className="form-control" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                                    {errorMessage && <span className="error-message">{errorMessage}</span>}
                                    {successMessage && <span className="success-message">{successMessage}</span>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default ChangePasswordModal;
