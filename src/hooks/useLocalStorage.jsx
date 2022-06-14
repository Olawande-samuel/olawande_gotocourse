import {useEffect} from 'react';




const useLocalStorage = () => {
    function getItem(key, defaultValue) {
        //first we get the item
        let item = localStorage.getItem(key);
        if(!item) {
            //if it doesn't exist then we set the item;
            localStorage.setItem(key, JSON.stringify(defaultValue))
        }
        return item ? JSON.parse(item) : defaultValue
    }

    function removeItem(key){
        localStorage.removeItem(key);
    }


    function updateItem(key, newValue){
        //first we delete the old item
        removeItem(key);

        //then we set the item
        localStorage.setItem(key, JSON.stringify(newValue))

        return newValue;
    }
    

    useEffect(() => {
        console.log("Rendering");
        return () => console.log("Rerendering");
    }, [])

    return {removeItem, updateItem, getItem};
}




export default useLocalStorage;