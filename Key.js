//handles key input

import { useEffect } from 'react'

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