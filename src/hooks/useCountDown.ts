import { useEffect, useState } from 'react';

export const useCountDown = (initialTime: number, target: number): number => {
    const [countDown, setCountDown] = useState(initialTime);

    useEffect(() => {
        if (initialTime > target) return;

        const interval = setInterval(() => {
            setCountDown(initialTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [initialTime]);

    return countDown;
};
