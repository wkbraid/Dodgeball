import { useEffect } from 'react'
import { Move } from "./Entities.js"

export const useOnKeyPress = (callback, targetKey) => {
useEffect(() => {

    const keyPressHandler = (event) => {
        if(event.key == targetKey){
            callback();
        }
    }
    document.addEventListener('keydown', keyPressHandler);
    return () => {
        document.removeEventListener('keydown', keyPressHandler);
    }

},[callback, targetKey])

}