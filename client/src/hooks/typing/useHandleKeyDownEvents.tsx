import { useEffect, useState } from "react";
import { usePracticeStore } from "../../store/practiceStore";

const useHandleKeyDownEvents = () => {
    const [lastKeyTab, setLastKeyTab] = useState(false);

    const characterCursor = usePracticeStore((state) => state.characterCursor);
    const words = usePracticeStore((state) => state.words);
    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const isWrong = usePracticeStore((state) => state.isWrong);
    const wrongCharacterIndex = usePracticeStore(
        (state) => state.wrongCharacterIndex
    );
    const wrongWordIndex = usePracticeStore((state) => state.wrongWordIndex);
    const isStarted = usePracticeStore((state) => state.isStarted);
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const handleKeyDown = usePracticeStore((state) => state.handleKeyDown);

    const handleKeyDownWrapper = (event: KeyboardEvent) =>
        handleKeyDown(event, lastKeyTab, setLastKeyTab);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDownWrapper);

        return () =>
            document.removeEventListener("keydown", handleKeyDownWrapper);
    }, [
        characterCursor,
        wordCursor,
        words,
        isWrong,
        wrongCharacterIndex,
        wrongWordIndex,
        isStarted,
        isCompleted,
        lastKeyTab,
    ]);
};

export default useHandleKeyDownEvents;
