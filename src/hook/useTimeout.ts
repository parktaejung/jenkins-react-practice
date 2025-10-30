import { useEffect,useRef } from "react";

const useTimeout = (callback : () => void, delay : number) => {
    const savedCallback = useRef(callback);

    useEffect(()=>{
        savedCallback.current = callback;
    },[callback]);

    useEffect(()=>{
        const handler = () => savedCallback.current();

        const timeoutId = setTimeout(handler,delay);

        return () => clearTimeout(timeoutId);
    },[delay])
}

export default useTimeout;