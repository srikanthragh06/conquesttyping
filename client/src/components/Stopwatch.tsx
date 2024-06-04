import { useEffect, useRef, useState } from "react";

type StopwatchTypes = {
    className?: string;
    start: boolean;
    stop: boolean;
    duration: number;
};

const Stopwatch = ({
    className = "",
    start,
    stop,
    duration,
}: StopwatchTypes) => {
    const [seconds, setSeconds] = useState(duration);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (start) {
            setSeconds(duration || 0);
            intervalRef.current = setInterval(
                () => setSeconds((prev) => prev - 1),
                1000
            );
        } else {
            clearInterval(intervalRef.current as number);
            intervalRef.current = null;
        }

        return () => clearInterval(intervalRef.current as number);
    }, [start]);

    useEffect(() => {
        if (stop) {
            clearInterval(intervalRef.current as number);
            intervalRef.current = null;
        }
    }, [stop]);

    return <span className={className}>{seconds}</span>;
};

export default Stopwatch;
