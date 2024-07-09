
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../NavBars/side.navbar';
import TopNavbar from '../NavBars/top.navbar';
import '../../assets/styles/list.css';
import TaskDetailsModal from '../TaskModels/task.list.model';

import LoadingSpinner from '../loadingIcons/loading';
import { getCompletedTasks, getTasks, starredTask } from '../../services/task.api';

import CompletedTaskList, { Task } from '../taskTables/completedTask.table.';

const CompletedTasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false); // State for showing/hiding EditTaskModal
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
 
    const [isLoadingViewModal, setIsLoadingViewModal] = useState(false);


    const handleView = (task: Task): void => {
        setSelectedTask(task);
        setIsLoadingViewModal(true);
        setTimeout(() => {
            setShowViewModal(true);
            setIsLoadingViewModal(false);
        }, 1000);
    };

    const handleCloseViewModal = (): void => {
        setShowViewModal(false);
    };


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const userIdString = localStorage.getItem("user");
                if (userIdString !== null) {
                    const userId = parseInt(userIdString);  // Convert user ID to a number
                    if (!isNaN(userId)) {
                        const response = await getCompletedTasks({userId});
                        setTasks(response.data.data);
                    } else {
                        console.error('User ID is not a valid number');
                    }
                } else {
                    console.error('User ID not found in localStorage');
                }
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };
    
        fetchTasks();
    }, []);
    
    

    return (
        <div className="container-fluid" style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                    <TopNavbar onSearch={() => { }} />
                    <div className="task-manager">
                        <CompletedTaskList
                            tasks={tasks}
                            onView={handleView}
                        />
                    </div>
                </div>
            </div>
            
            <TaskDetailsModal showModal={showViewModal} selectedTask={selectedTask} onClose={handleCloseViewModal} />
            {isLoadingViewModal && <LoadingSpinner />}
        </div>
    );
};

export default CompletedTasks;
