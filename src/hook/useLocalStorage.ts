import {useState} from 'react';

//[Generic T적용] key : string, initialValue:T를 받아서  [T, (value: T) => void] 를 반환

const useLocalStorage = <T,>(key:string, initialValue:T) : [T, (value:T) => void] => {
    //1.초기상태 설정 로직(Local Strorage에서 값을 읽어옴)
    // const [storedValue, setStoredValue] = useState<T>(()=>{
    //     try{
    //         const item = window.localStorage.getItem(key);
    //         return item ? JSON.parse(item) : initialValue;
    //     }catch(error){
    //         console.error(error);
    //         return initialValue;
    //     }
    // })

    //2. 값 업데이트 및 Local Storage 저장하는 함수
    // const setValue = (value:T) =>{
    //     try{
    //         setStoredValue(value);
    //         window.localStorage.setItem(key,JSON.stringify(value));
    //     }catch(error){
    //         console.error(error)
    //     }
    // }
    // return [storedValue,setValue];

    const [storedValue, setStoredValue] = useState<T>(()=>{
        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch(error){
            console.error(error);
            return initialValue;
        }
    })

    const setValue = (value:T) => {
        try{
            setStoredValue(value);
            window.localStorage.setItem(key,JSON.stringify(value));
        }catch(error){
            console.error(error);
        }
    }
    return [storedValue,setValue];

}

export default useLocalStorage;