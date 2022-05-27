import {useState, useEffect} from  "react";



import { AdvancedError } from "../classes";


const useCookies = () => {
    async function fetchCookie(key){
        //do some code
        let value = "";
        document.cookie.split(";").filter(v => v.includes(key)).forEach(v => {
            if(v.split("=")[0].trim() == key.trim()) value = split("=")[1]
        })
        return value;
    }

    async function saveCookie(key, value){
        //save the cookie
        return new Promise(_ => {
            try{
                if(!key || !value) throw new AdvancedError("Key and Value must have a value", 402);
                else{
                    document.cookie=`${key.trim().toLowerCase()}=${value}`;
                }
            }catch(err){
                console.log({statusCode: err.statusCode, message: err.message});
            }
        })
    }

    async function removeCookie(key){
        //remove the cookie with key=key
        document.cookie.split(";").filter(v => v.includes(key)).forEach(v => {
            v.split("=")[0].trim() == key.trim() ? document.cookie = `${key.trim()}=` : false;
        })
    }

    async function clearCookie(){
        //clear all cookies
        return new Promise(resolve => {
            document.cookie = '';
            resolve(true);
        })
    }


    function isCookie(key){
        let isKey = false;
        document.cookie.split(";").filter(v => v.includes(key)).forEach(v => {
            isKey = v.split("=")[0].trim() == key.trim() ? true : false;
        })
        return isKey
    }


    return {
        fetchCookie,
        saveCookie,
        removeCookie,
        clearCookie,
        isCookie
    }
}




export default useCookies;