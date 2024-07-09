
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../NavBars/side.navbar';
import TopNavbar from '../NavBars/top.navbar';
import '../../assets/styles/list.css';
import TaskList, { Task } from '../taskTables/task.list';
import TaskDetailsModal from '../TaskModels/task.list.model';
import AddTaskModal from '../TaskModels/add.task.model'; // Import the EditTaskModal
import addButtonImage from '../../assets/images/add.png';
import LoadingSpinner from '../loadingIcons/loading';
import { deleteTask, getTasks, starredTask } from '../../services/task.api';
import EditTaskModal from '../TaskModels/edit.task';
import Toaster from '../TaskModels/toaster';
import StarredTaskList from '../taskTables/starredTask.list';

const StarredTasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false); // State for showing/hiding EditTaskModal
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isLoadingAddModal, setIsLoadingAddModal] = useState(false);
    const [isLoadingViewModal, setIsLoadingViewModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');

    const handleEdit = (task: Task): void => {
        setSelectedTask(task);
        setShowEditModal(true);
    };

    const handleCloseEditModal = (): void => {
        setShowEditModal(false);
    };

    const handleEditTaskSubmit = (editedTask: Task): void => {

        setShowEditModal(false);
    };

    const handleSetPriority = (taskId: number, priority: 'Low' | 'Medium' | 'High'): void => {

        setTasks(tasks.map(task => task.id === taskId ? { ...task, priority } : task));
    };

    const handleView = (task: Task): void => {
        setSelectedTask(task);
        setIsLoadingViewModal(true);
        setTimeout(() => {
            setShowViewModal(true);
            setIsLoadingViewModal(false);
        }, 1000);
    };

    const handleDelete = async (task: Task): Promise<void> => {
        try {
            setIsDeleting(true);
            const response = await deleteTask({ userId: task.user, taskId: task.taskId });
            if (response.data.code === 200) {
                setTasks(tasks.filter(t => t.taskId !== task.taskId));
                setToasterMessage('Task deleted successfully');
                setTimeout(() => setToasterMessage(''), 2000); // Clear toaster message after 2 seconds
            } else {
                console.error('Failed to delete task:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCloseAddModal = (): void => {
        setShowAddModal(false);
    };

    const handleCloseViewModal = (): void => {
        setShowViewModal(false);
    };

    const handleAddTask = (): void => {
        setShowAddModal(true);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const userIdString = localStorage.getItem("user");
                if (userIdString !== null) {
                    const userId = parseInt(userIdString);  // Convert user ID to a number
                    if (!isNaN(userId)) {
                        const starred = true
                        const response = await getTasks({userId,starred});
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
    

    const handleAddTaskSubmit = async (newTask: Task): Promise<void> => {
        try {
            // Add the new task
            setTasks([...tasks, newTask]);
            setTimeout(() => {
                setShowAddModal(false);
            }, 1500);
    
            // Retrieve userId from localStorage
            const userIdString = localStorage.getItem("user");
            const userId = userIdString ? parseInt(userIdString) : 0; // Default to 0 if user ID is not found or not a valid number
            // Fetch tasks using userId
            const response = await getTasks({ userId });
            setTasks(response.data.data);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };
    

  async  function handleStarr(task: any): Promise<void> {
        if(task.starred===false){
            const star = 1;
            const user = task.user;
            const taskId=task.taskId
            const response = await starredTask({user,taskId,star})
            if(response.data.code ===200){
                // Retrieve userId from localStorage
            const userIdString = localStorage.getItem("user");
            const userId = userIdString ? parseInt(userIdString) : 0; // Default to 0 if user ID is not found or not a valid number
            // Fetch tasks using userId
            const response = await getTasks({ userId });
            setTasks(response.data.data);
            }else{
                return
            }
        }else{
            const star = 0;
            const user = task.user;
            const taskId=task.taskId
            const response= await starredTask({user,taskId,star})
            if(response.data.code ===200){
                // Retrieve userId from localStorage
            const userIdString = localStorage.getItem("user");
            const userId = userIdString ? parseInt(userIdString) : 0; // Default to 0 if user ID is not found or not a valid number
            // Fetch tasks using userId
            const response = await getTasks({ userId });
            setTasks(response.data.data);
            
        }
        
    }}

    return (
        <div className="container-fluid" style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                    <TopNavbar onSearch={() => { }} />
                    <div className="task-manager">
                        <StarredTaskList
                            tasks={tasks}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetPriority={handleSetPriority}
                            onView={handleView}
                        />
                    </div>
                </div>
            </div>
            <img src={addButtonImage} alt="Add Task" className="add-task-button" onClick={handleAddTask} />
            <AddTaskModal showModal={showAddModal} onClose={handleCloseAddModal} onSubmit={handleAddTaskSubmit} />
            {isLoadingAddModal && <LoadingSpinner />}
            <TaskDetailsModal showModal={showViewModal} selectedTask={selectedTask} onClose={handleCloseViewModal} />
            {isLoadingViewModal && <LoadingSpinner />}
            {isDeleting && <Toaster message={toasterMessage} />}
            <EditTaskModal
                showModal={showEditModal}
                onClose={handleCloseEditModal}
                onSubmit={handleEditTaskSubmit}
                selectedTask={selectedTask}
            />
        </div>
    );
};

export default StarredTasks;
