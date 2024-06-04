import { useEffect } from "react";
import { usePracticeStore } from "../../store/practiceStore";

const useHandleKeyPressEvents = () => {
    const words = usePracticeStore((state) => state.words);
    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const characterCursor = usePracticeStore((state) => state.characterCursor);
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const wrongWordIndex = usePracticeStore((state) => state.wrongWordIndex);
    const wrongCharacterIndex = usePracticeStore(
        (state) => state.wrongCharacterIndex
    );
    const isWrong = usePracticeStore((state) => state.isWrong);

    const handleKeyPress = usePracticeStore((state) => state.handleKeyPress);

    useEffect(() => {
        document.addEventListener("keypress", handleKeyPress);

        return () => document.removeEventListener("keypress", handleKeyPress);
    }, [
        characterCursor,
        wordCursor,
        words,
        isWrong,
        wrongCharacterIndex,
        wrongWordIndex,
        isCompleted,
    ]);
};

export default useHandleKeyPressEvents;
