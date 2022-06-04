import {useState, useEffect} from  "react";



import { AdvancedError } from "../classes";


const useCookies = () => {
    function fetchCookie(key){
        //do some code
        let value = "";
        document.cookie.split(";").filter(v => v.includes(key)).forEach(v => {
            if(v.split("=")[0].trim() == key.trim()) value = v.split("=")[1]
        })
        // console.log(value);
        return value ? JSON.parse(value) : value;
    }

    function updateCookie(key, newdata){
        if(!isCookie(key)) return;
        else {
            //first we fetch the cookie
            let cookie = fetchCookie(key);
            let newCookie;
            if(typeof cookie === 'object'){
                newCookie = {
                    ...cookie,
                    ...newdata
                }
                
            }else newCookie = newdata;
            //then we remove the cookie
            removeCookie(key);
            //then we save it 
            saveCookie(key, newCookie);
        }
    }

    function saveCookie(key, value){
        //save the cookie
        if(!key || !value) throw new AdvancedError("Key and Value must have a value", 402);
        else{
            document.cookie=`${key.trim().toLowerCase()}=${JSON.stringify(value)}`;
        }
    }

    function removeCookie(key){
        //remove the cookie with key=key
        document.cookie.split(";").filter(v => v.includes(key)).forEach(v => {
            if(v.split("=")[0].trim() == key.trim()) document.cookie = `${key.trim()}=`;
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
        isCookie,
        updateCookie
    }
}




export default useCookies;