import React from 'react';
import { Modal } from 'react-bootstrap';
import '../../assets/styles/view.model.css';
import background from "../../assets/images/view.jpg";
import { formatDate } from '../../helpers/common.helpers';

interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    category: string;
}

interface TaskDetailsModalProps {
    showModal: boolean;
    selectedTask: Task | null;
    onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ showModal, selectedTask, onClose }) => {
    // Function to get priority color
    const getPriorityColor = (priority: 'Low' | 'Medium' | 'High' | undefined): string => {
        switch (priority) {
            case 'Low':
                return 'green';
            case 'Medium':
                return 'orange';
            case 'High':
                return 'red';
            default:
                return 'black'; // Default color
        }
    };

    return (
        <Modal show={showModal} onHide={onClose} backdropClassName="modal-backdrop-custom">
            <div className="task-details-modal custom-modal">
                <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
                    <div className="modal-content">
                        <Modal.Header closeButton className="modal-header">
                            <Modal.Title className="modal-title">{selectedTask?.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-body" style={{ backgroundImage: `url(${background})` }}>
                            <div className="text-content">
                                <p><strong>Description:</strong> {selectedTask?.description}</p>
                                <p><strong>Priority:</strong> <span style={{ color: getPriorityColor(selectedTask?.priority), fontWeight: 'bold' }}>{selectedTask?.priority}</span></p>
                                <p><strong>Due Date:</strong> {selectedTask && selectedTask.dueDate ? formatDate(selectedTask.dueDate) : 'N/A'}</p>
                                <p><strong>Category:</strong> {selectedTask?.category}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="modal-footer">
                            <button onClick={onClose} className="btn btn-primary">Close</button>
                        </Modal.Footer>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TaskDetailsModal;
