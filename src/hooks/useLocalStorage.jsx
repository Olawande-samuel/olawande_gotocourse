import {useState, useEffect} from 'react';




const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(null);
    function getItem(){
        let item = localStorage.getItem(key);
        if(!item) {
            //set the item;
            localStorage.setItem(key, JSON.stringify(defaultValue))
        }

        //then get the item
        item = localStorage.getItem(key);

        return JSON.parse(item);
    }

    function removeItem(key){
        localStorage.removeItem(key);
    }

    useEffect(() => {
        setValue(_ => getItem());
    }, [value])

    return {value, removeItem};
}




export default useLocalStorage;