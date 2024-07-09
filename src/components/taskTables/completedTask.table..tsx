import React, { useState } from 'react';
import viewButton from '../../assets/images/view.png';
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
    completedDate:string;

}

interface TaskListProps {
    tasks: Task[];
    onView: (task: Task) => void; 
}

const CompletedTaskList: React.FC<TaskListProps> = ({ tasks, onView }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');



    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const filteredTasks = selectedCategory === 'All' ? tasks : tasks.filter(task => task.category === selectedCategory);
    

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
                        <th>Completed Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td >{task.priority}</td>
                            <td>{formatDate(task.completedDate)}</td>
                            <td>
                                <button type="button" className="btn btn-info" onClick={() => onView(task)} style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '6px' }}>
                                    <img src={viewButton} alt="View" style={{ width: '19px', height: '19px', background: 'transparent' }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default  CompletedTaskList
