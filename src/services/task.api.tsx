import { axiosInstance } from "./request";

export const getTasks = async(userId:any)=>{
    try{
        const response = await axiosInstance.post('tasks/get-tasks',userId);
        return response
    }catch(error){
        throw new Error('Failed to get tasks')
    }
}

export const getCompletedTasks = async(userId:any)=>{
    try{
        const response = await axiosInstance.post('tasks/completed-tasks',userId);
        return response
    }catch(error){
        throw new Error('Failed to get tasks')
    }
}

export const addTask = async (newTask: any): Promise<any> => {
    try {
        const response = await axiosInstance.post('tasks/add-task', newTask);
        return response;
    } catch (error) {
        throw new Error('Failed to add task');
    }
};

export const deleteTask = async(data:any):Promise<any>=>{
    try{
        const response = await axiosInstance.post('tasks/delete-task',data)
        return response
    }catch{
        throw new Error('Failed to delete task')
    }
}

export const editTask = async(data:any):Promise<any>=>{
    try{
        const response = await axiosInstance.put('tasks/edit-task',data);
        return response
    }catch{
        throw new Error('Failed to update task ')
    }
}

export const starredTask = async(data:any):Promise<any>=>{
    try{
  const response = await axiosInstance.put('tasks/star-task',data)
  return response
    }catch(error){
   throw new Error ('Failed to add to starred ')
    }
}

export const completeTask = async(data:any):Promise<any>=>{
    try{
  const response = await axiosInstance.put('tasks/complete-task',data)
  return response
    }catch(error){
   throw new Error ('Failed to add to starred ')
    }
}

