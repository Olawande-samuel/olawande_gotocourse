import axios from "axios";


import { AdvancedError } from "../classes";
import { baseURL } from "../constants";


export const authFunctions = {
    login: async function (_data){
        try{
            const res = await axios.post(`${baseURL}/user/signin`, 
            JSON.stringify(_data), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(res.statusCode === 0) throw new AdvancedError(res.message, res.statusCode);
            return {...res, success: true};
        }catch(err){
            console.log(err.message);
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    },
    register: async function(_data){
        try{
            const res = await axios.post(`${baseURL}/user/signup`,
            JSON.stringify(_data),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res); 
            if(res.statusCode === 0) throw new AdvancedError(res.message, res.statusCode);
            return {
                ...res,
                success: true
            }
            
        }catch(err){
            console.log(err.message);
            return {
                success: false,
                message: err.message,
                statusCode: err.statusCode
            }
        }
    }
        
}