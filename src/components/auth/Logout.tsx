// const logout = () => {

import { Navigate } from "react-router-dom";

 
//     // Clear local storage
    // localStorage.removeItem("user");
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    // window.location.href=("/login"); // Assuming you're using React Router and have access to the history object
// };

// export default logout;

 export const Logout: React.FC = () => {

     function logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
     }
    logout(); // Call the logout function
    return <Navigate to="/login" />; // Redirect to login page after logout
};
