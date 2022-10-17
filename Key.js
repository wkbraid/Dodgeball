//handles key input

import { useEffect } from 'react'

const UseOnKeyPress = (callback, targetKey) => {
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

const UseOnKeyRelease = (callback, targetKey) => {
    useEffect(() => {
    
        const keyPressHandler = (event) => {
            if(event.key == targetKey){
                callback();
            }
        }
        document.addEventListener('keyup', keyPressHandler);
        return () => {
            document.removeEventListener('keyup', keyPressHandler);
        }
    
    },[callback, targetKey])
}

export {UseOnKeyPress, UseOnKeyRelease};