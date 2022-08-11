import { useState, useEffect } from "react";

const useCounter = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setCounter(counter + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { counter, setCounter };
};

export default useCounter;
