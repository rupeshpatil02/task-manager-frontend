import { axiosInstance } from "./request";

export const getAnalysis = async(data:any)=>{
    try{
        const response = await axiosInstance.post('analyze/getByMonth',data);
        return response
    }catch(error){
        throw new Error('Failed to get tasks')
    }
}
