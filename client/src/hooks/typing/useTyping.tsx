import { useEffect } from "react";
import useStartTyping from "./useStartTyping";
import { usePracticeStore } from "../../store/practiceStore";
import useHandleKeyPressEvents from "./useHandleKeyPressEvents";
import useHandleKeyDownEvents from "./useHandleKeyDownEvents";

const useTyping = () => {
    const completeTyping = usePracticeStore((state) => state.completeTyping);
    const reset = usePracticeStore((state) => state.reset);
    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const characterCursor = usePracticeStore((state) => state.characterCursor);
    const pageNumber = usePracticeStore((state) => state.pageNumber);
    const mode = usePracticeStore((state) => state.mode);
    const duration = usePracticeStore((state) => state.duration);

    useEffect(() => {
        reset();
    }, [mode, duration]);

    useEffect(() => {
        completeTyping();
    }, [pageNumber, wordCursor, characterCursor]);

    useStartTyping();
    useHandleKeyPressEvents();
    useHandleKeyDownEvents();
};

export default useTyping;
