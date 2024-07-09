import React, { useState, ChangeEvent, useEffect } from 'react';
import { Task } from '../taskTables/task.list';
import '../../assets/styles/addTask.model.css';
import background from "../../assets/images/addTask.jpg";
import { addTask } from '../../services/task.api';
import { validateTaskForm, Errors } from '../../helpers/validations/task.validation';

interface AddTaskModalProps {
    showModal: boolean;
    onClose: () => void;
    onSubmit: (newTask: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ showModal, onClose, onSubmit }) => {
    const userIdString = localStorage.getItem("user");
    const userId = userIdString ? parseInt(userIdString) : 0; 

    const [newTask, setNewTask] = useState<Task>({
        id: userId,
        title: '',
        description: '',
        priority: 'Low',
        dueDate: '',
        category: '',
        user: userId, // Set user ID initially
        taskId: 0,
    
        
    });

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errors, setErrors] = useState<Errors | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setNewTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (): Promise<void> => {
        const validation = validateTaskForm(newTask.title, newTask.description, newTask.category, newTask.dueDate, newTask.priority)
        if (validation) {
            setErrors(validation);
            return;
        }

        try {
            const response = await addTask(newTask);
            if (response.data.code === 200) {
                setSuccessMessage(response.data.status);
                onSubmit(newTask);
                // Clear the form after successful submission
                setNewTask({
                    ...newTask,
                    title: '',
                    description: '',
                    priority: 'Low',
                    dueDate: '',
                    category: '',
                });
                setErrors(null);
                setTimeout(() => {
                    setSuccessMessage('');
                    onClose();
                }, 2000);
            } else {
                setErrorMessage(response.data.status);
            }
        } catch (error) {
            console.error('Failed to add task:', error);
            setErrorMessage('Failed to add task. Please try again.');
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (errorMessage) {
            timeout = setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [errorMessage]);

    return (
        showModal ? (
            <div className="custom-modal" tabIndex={-2} role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog custom-modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title-container">
                                <h4 className="modal-title">Add Task</h4>
                            </div>
                            <div className="close-button-container">
                                <button type="button" className="close-button" aria-label="Close" onClick={onClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div className="modal-body" style={{ backgroundImage: `url(${background})` }}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" className="form-control" name="title" value={newTask.title} onChange={handleChange} placeholder="Enter title" />
                                    {errors && errors.title && <span className="error">{errors.title}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" className="form-control" name="description" value={newTask.description} onChange={handleChange} placeholder="Enter description" />
                                    {errors && errors.description && <span className="error">{errors.description}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priority">Priority</label>
                                    <select id="priority" className="form-control" name="priority" value={newTask.priority} onChange={handleChange}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    {errors && errors.priority && <span className="error">{errors.priority}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dueDate">Due Date</label>
                                    <input type="date" id="dueDate" className="form-control" name="dueDate" value={newTask.dueDate} onChange={handleChange} />
                                    {errors && errors.date && <span className="error">{errors.date}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select id="category" className="form-control" name="category" value={newTask.category} onChange={handleChange}>
                                        <option value="study">Study</option>
                                        <option value="work">Work</option>
                                        <option value="event">Event</option>
                                        <option value="daily life">Daily Life</option>
                                        <option value="sports">Sports</option>
                                    </select>
                                    {errors && errors.category && <span className="error">{errors.category}</span>}
                                </div>
                            </form>
                            <div className="message-container">
                                {errorMessage && <span className="error-message" style={{ color: 'red', marginLeft: "40%", fontWeight: 'bold' }}>{errorMessage}</span>}
                                {successMessage && <span className="success-message" style={{ color: 'green', marginLeft: "40%", fontWeight: 'bold' }}>{successMessage}</span>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add Task</button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default AddTaskModal;
