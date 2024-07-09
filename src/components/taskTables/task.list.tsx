import React, { useState } from 'react';
import editButton from '../../assets/images/edit.png';
import viewButton from '../../assets/images/view.png';
import deleteButton from '../../assets/images/delete.png';
import starButton from '../../assets/images/star.png'; // Add star button image import
import '../../assets/styles/list.css';
import { formatDate } from '../../helpers/common.helpers';

export interface Task {
    taskId: any;
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    category: string;
    user: number;

}

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (tasks: Task) => void;
    onSetPriority: (taskId: number, priority: 'Low' | 'Medium' | 'High') => void;
    onView: (task: Task) => void;
    onStarred: (task: Task) => void; // Add onStarred prop
    onCompleted:(task: Task) => void; 
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onSetPriority, onView, onStarred ,onCompleted}) => {
    const [editingPriority, setEditingPriority] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [starredTasks, setStarredTasks] = useState<number[]>([]);

    const handlePriorityClick = (taskId: number) => {
        setEditingPriority(taskId);
    };

    const handlePriorityChange = (taskId: number, priority: 'Low' | 'Medium' | 'High') => {
        onSetPriority(taskId, priority);
        setEditingPriority(null);
    };

    const getPriorityTextColor = (priority: 'Low' | 'Medium' | 'High'): string => {
        switch (priority) {
            case 'Low':
                return 'green';
            case 'Medium':
                return 'orange';
            case 'High':
                return 'red';
            default:
                return 'black';
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const filteredTasks = selectedCategory === 'All' ? tasks : tasks.filter(task => task.category === selectedCategory);




    const toggleStar = (id: number) => {
        if (starredTasks.includes(id)) {
            setStarredTasks(starredTasks.filter(taskId => taskId !== id));
        } else {
            setStarredTasks([...starredTasks, id]);
        }
    };
   
    const toggleComplet = (id: number) => {
        if (starredTasks.includes(id)) {
            setStarredTasks(starredTasks.filter(taskId => taskId !== id));
        } else {
            setStarredTasks([...starredTasks, id]);
        }
    };

    function isStarred(id: number): boolean {
        return starredTasks.includes(id);
    }


    return (
        <div>
            <select
                className="custom-dropdown"
                value={selectedCategory}
                onChange={handleCategoryChange}
                aria-label="Select task category"
            >
                <option value="All">All Categories</option>
                <option value="study">Study</option>
                <option value="work">Work</option>
                <option value="event">Event</option>
                <option value="daily life">Daily Life</option>
                <option value="sports">Sports</option>
            </select>

            <table className="table table-striped transparent-table" style={{ borderRadius: '0.5rem' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                        <th>Star</th> {/* Add a new column for the star button */}
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td style={{ width: '150px' }}>
                                {editingPriority === task.id ? (
                                    <select
                                        value={task.priority}
                                        onChange={(e) => handlePriorityChange(task.id, e.target.value as 'Low' | 'Medium' | 'High')}
                                        aria-label={`Change priority for task ${task.title}`}
                                        style={{ background: 'transparent', marginTop: '6px', borderRadius: '7px' }}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                ) : (
                                    <div onClick={() => handlePriorityClick(task.id)} style={{ padding: '5px', borderRadius: '5px', color: getPriorityTextColor(task.priority), background: 'transparent', fontWeight: 'bold' }}>
                                        {task.priority}
                                    </div>
                                )}
                            </td>
                            <td>{formatDate(task.dueDate)}</td>
                            <td>
                                <button type="button" className="btn btn-info" onClick={() => onView(task)} style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '-30px' }}>
                                    <img src={viewButton} alt="View" style={{ width: '19px', height: '19px', background: 'transparent' }} />
                                </button>
                                <button type="button" className="btn btn-warning me-2" onClick={() => onEdit(task)} style={{ backgroundColor: 'transparent', border: 'none' }}>
                                    <img src={editButton} alt="Edit" style={{ width: '19px', height: '19px', background: 'transparent' }} />
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => onDelete(task)} style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '-10px' }}>
                                    <img src={deleteButton} alt="Delete" style={{ width: '19px', height: '19px', background: 'transparent' }} />
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => { toggleStar(task.id); onStarred(task); }}
                                    style={{
                                        backgroundColor: isStarred(task.id) ? 'yellow' : 'transparent',
                                        border: 'none',
                                        padding: '1px',
                                        paddingTop: '1px' // Adjust the padding to make the background smaller
                                    }}
                                >
                                    <img
                                        src={starButton}
                                        alt="Star"
                                        style={{
                                            width: '19px',
                                            height: '19px',
                                            background: 'transparent'
                                        }}
                                    />
                                </button>

                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    id={`starred-checkbox-${task.id}`}
                                    checked={isStarred(task.id)}
                                    onChange={() => { toggleComplet(task.id); onCompleted(task); }}
                                    style={{ display: 'none' }} // Hide the default checkbox input
                                />
                                <label
                                    htmlFor={`starred-checkbox-${task.id}`}
                                    style={{
                                        marginTop: '7px',
                                        display: 'inline-block',
                                        width: '19px',
                                        height: '19px',
                                        border: '1px solid #ccc',
                                        borderRadius: '3px',
                                        backgroundColor: isStarred(task.id) ? 'green' : 'transparent',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Custom checkbox icon */}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 26 26"
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            visibility: isStarred(task.id) ? 'visible' : 'hidden',
                                            marginLeft: '3px',
                                            marginBottom: '9px'
                                        }}
                                    >
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </label>

                            </td>



                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
