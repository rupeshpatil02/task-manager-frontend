import React, { useState, ChangeEvent, useEffect } from 'react';
import { Task } from '../taskTables/task.list';
import '../../assets/styles/addTask.model.css';
import background from "../../assets/images/addTask.jpg";
import { Errors, validateTaskForm } from '../../helpers/validations/task.validation';
import { capitalizeFirstLetter, formatDate } from '../../helpers/common.helpers';
import { editTask } from '../../services/task.api';

interface EditTaskModalProps {
    showModal: boolean;
    onClose: () => void;
    onSubmit: (editedTask: Task) => void;
    selectedTask: Task | null;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ showModal, onClose, onSubmit, selectedTask }) => {
    const [editedTask, setEditedTask] = useState<Task | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errors, setErrors] = useState<Errors | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        setEditedTask(selectedTask);
    }, [selectedTask]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        if (!editedTask) return;
        const { name, value } = e.target;
        if (name === 'dueDate') {
            const formattedDate = formatDate(value); // Format the date
            setEditedTask(prevTask => ({
                ...(prevTask as Task), // Type assertion here
                [name]: formattedDate
            }));
        } else {
            setEditedTask(prevTask => ({
                ...(prevTask as Task), // Type assertion here
                [name]: value
            }));
        }
    };
    
    
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        if (!editedTask) return;
        const { name, value } = e.target;
        setEditedTask(prevTask => ({
            ...(prevTask as Task), // Type assertion here
            [name]: value
        }));
    };
    
   interface Task {
        taskId: any;
        title: string;
        description: string;
        priority: 'Low' | 'Medium' | 'High';
        dueDate: string;
        category: string;
        user: number;
    
    }
    const handleSubmit = async (): Promise<void> => {
        if (!editedTask) return; // If editedTask is null, return early
    
        // Filter out unwanted properties
        const filteredTask: Task = {
            user: typeof editedTask.user === 'number' ? editedTask.user : 0, // Ensure user is a number
            taskId: typeof editedTask.taskId === 'number' ? editedTask.taskId : 0, // Ensure taskId is a number
            title: editedTask.title || '',
            description: editedTask.description || '',
            priority: editedTask.priority || 'Low', // Set default value if priority is null or empty
            dueDate: editedTask.dueDate || '',
            category: editedTask.category || ''
        };
    
        const validation = validateTaskForm(filteredTask.title, filteredTask.description, filteredTask.category, filteredTask.dueDate, filteredTask.priority);
        if (validation) {
            setErrors(validation);
            return;
        }
    
        try {
            const response = await editTask(filteredTask);
            if (response.data.code === 200) {
                setSuccessMessage(response.data.status);
                setTimeout(() => {
                    setSuccessMessage('');
                    onClose();
                }, 2000);
            } else {
                setErrorMessage(response.data.status);
            }
        } catch (error) {
            setErrorMessage('Failed to add task. Please try again.');
        }
    };
    

    let formattedDueDate = '';
    if (editedTask && editedTask.dueDate) {
        formattedDueDate = formatDate(editedTask.dueDate);
    }
    let formattedPriority=''
    if(editedTask && editedTask.priority){
        formattedPriority=capitalizeFirstLetter(editedTask.priority)
    }

    return (
        showModal ? (
            <div className="custom-modal" tabIndex={-2} role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog custom-modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title-container">
                                <h4 className="modal-title">Edit Task</h4>
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
                                    <input type="text" id="title" className="form-control" name="title" value={editedTask?.title || ''} onChange={handleChange} placeholder="Enter title" />
                                    {errors && errors.title && <span className="error">{errors.title}</span>}
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" className="form-control" name="description" value={editedTask?.description || ''} onChange={handleDescriptionChange} placeholder="Enter description" />
                                    {errors && errors.description && <span className="error">{errors.description}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priority">Priority</label>
                                    <select id="priority" className="form-control" name="priority" value={formattedPriority || ''} onChange={handleChange}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    {errors && errors.priority && <span className="error">{errors.priority}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dueDate">Due Date</label>
                                    <input type="text" id="dueDate" className="form-control" name="dueDate" value={formattedDueDate} onChange={handleChange} placeholder="mm/dd/yyyy" />
                                    {errors && errors.date && <span className="error">{errors.date}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select id="category" className="form-control" name="category" value={editedTask?.category || ''} onChange={handleChange}>
                                        <option value="study">Study</option>
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
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default EditTaskModal;
