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
            const res = await axios.post(type !== "admin" ? `${baseURL}/user/signup` : `${baseURL}/admin/signin`,
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