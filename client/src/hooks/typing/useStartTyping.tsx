import { useEffect } from "react";
import { usePracticeStore } from "../../store/practiceStore";

const useStartTyping = () => {
    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const characterCursor = usePracticeStore((state) => state.characterCursor);
    const pageNumber = usePracticeStore((state) => state.pageNumber);

    const isStarted = usePracticeStore((state) => state.isStarted);
    const isCompleted = usePracticeStore((state) => state.isCompleted);

    const startTyping = usePracticeStore((state) => state.startTyping);
    const completeTyping = usePracticeStore((state) => state.completeTyping);

    const duration = usePracticeStore((state) => state.duration);
    const mode = usePracticeStore((state) => state.mode);

    useEffect(() => {
        startTyping();
    }, [wordCursor, characterCursor]);

    useEffect(() => {
        if (mode === "time") {
            let timer: number;
            if (isStarted && !isCompleted) {
                timer = setTimeout(() => {
                    completeTyping();
                }, duration * 1000);
            }
            return () => clearInterval(timer);
        }
    }, [isStarted, isCompleted]);

    useEffect(() => {
        if (mode === "words") completeTyping();
    }, [pageNumber, wordCursor, characterCursor]);
};

export default useStartTyping;
