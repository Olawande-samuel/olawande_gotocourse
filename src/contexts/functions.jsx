import axios from "axios";


import { AdvancedError } from "../classes";
import { baseURL } from "../constants";


export const authFunctions = {
    login: async function (_data, type){
        try{
            const res = await axios.post(type !== "admin" ? `${baseURL}/user/signin` : `${baseURL}/admin/signin`, 
            JSON.stringify(_data), {
                headers: {
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {...res.data, success: true};
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    register: async function(_data, type){
        try{
            console.log(_data)
            const res = await axios.post(type !== "admin" ? `${baseURL}/user/signup` : `${baseURL}/admin/signup`,
            JSON.stringify(_data),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    }
        
}



export const adminTeacherFunctions = {
    fetch: async function (token){
        try{
            const res = await axios.get(`${baseURL}/admin/teachers/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    verify: async function(_data, token){
        try{
            console.log(_data)
            const res = await axios.patch(`${baseURL}/admin/teacher/verify`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    verify_pledre: async function(_data, token){
        try{
            console.log(_data)
            const res = await axios.patch(`${baseURL}/admin/teacher/pledre/toggle`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    }

}


export const adminStudentFunctions = {
    fetch: async function (token){
        try{
            const res = await axios.get(`${baseURL}/admin/students/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    verify: async function(_data, token){
        try{
            console.log(_data)
            const res = await axios.post(`${baseURL}/admin/student/verify`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    verify_pledre: async function(_data, token){
        try{
            console.log(_data)
            const res = await axios.patch(`${baseURL}/admin/student/pledre/toggle`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    }

}



export const adminFunctions = {
    updateAvatar: async function(formdata, token){
        try{
            const res = await axios.post(`${baseURL}/admin/profile/avatar/update`,
            JSON.stringify(formdata),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    updateProfile: async function(_data, token){
        try{
            const res = await axios.patch(`${baseURL}/admin/profile/update`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchProfile: async function(token){
        try{
            const res = await axios.get(`${baseURL}/user/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    addCategory: async function(_data, token){
        try{
            const res = await axios.post(`${baseURL}/admin/category/add`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchCategory: async function(id, token){
        try{
            const res = await axios.get(`${baseURL}/admin/category/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchCategories: async function(token){
        try{
            const res = await axios.get(`${baseURL}/admin/categories`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchCourses: async function(token){
        try{
            const res = await axios.get(`${baseURL}/admin/courses/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
}


export const studentFunctions = {
    updateAvatar: async function(formdata, token){
        try{
            const res = await axios.post(`${baseURL}/user/profile/avatar/update`,
            formdata,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    updateProfile: async function(_data, token){
        try{
            const res = await axios.patch(`${baseURL}/user/profile/update`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchProfile: async function(token){
        try{
            const res = await axios.get(`${baseURL}/user/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchCourses: async function(token){
        try{
            const res = await axios.get(`${baseURL}/user/courses/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchEnrollments: async function(token){
        try{
            const res = await axios.get(`${baseURL}/user/course/enrollments/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    addCourse: async function(_data, token){
        try{
            const res = await axios.post(`${baseURL}/user/course/add`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
}


export const teacherFunctions = {
    updateAvatar: async function(formdata, token){

        try{
            const res = await axios.post(`${baseURL}/user/profile/avatar/update`,
            formdata,
            {
                headers: {

                    "Authorization": `Bearer ${token}`,

                    "Content-Type": "multipart/form-data"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    updateProfile: async function(_data, token){
        try{
            const res = await axios.patch(`${baseURL}/user/profile/update`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchProfile: async function(token){
        try{
            const res = await axios.get(`${baseURL}/user/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
        

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    addCourse: async function(_data, token){
        try{
            const res = await axios.post(`${baseURL}/teacher/course/add`,
            JSON.stringify(_data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchCourse: async function(_id, token){
        try{
            const res = await axios.get(`${baseURL}/user/course/${_id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchApplications: async function(token){
        try{
            const res = await axios.get(`${baseURL}/user/course/applications/fetch`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    fetchCourseStudents: async function(_id, token){
        try{
            const res = await axios.get(`${baseURL}/user/course/students/${_id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                validateStatus: status => {
                    return status >= 200 && status <= 505;
                }
            })
            console.log(res);

            if(res.data.statusCode === 0) throw new AdvancedError(res.data.message, res.data.statusCode);
            return {
                ...res.data,
                success: true
            }
            
        }catch(err){
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
}


