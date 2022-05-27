import axios from "axios";
import { baseURL } from "../constants";


export const authFunctions = () => {
    return {
        login: async function ({email, password}){
            try{
                const res = await axios.post(`${baseURL}/user/signin`, 
                JSON.stringify({email, password}), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log(res);
                return {
                    success: true
                }
            }catch(err){
                console.log(err.message);
                return {
                    success: false,
                    message: err.message
                }
            }
        },
        register: async function(data){
            try{
                const res = await axios.post(`${baseURL}/user/signup`,
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                console.log(res); 
                
            }catch(err){
                console.log(err.message);
                return {
                    success: false,
                    message: err.message
                }
            }
        }
        
    }
}