import { usePracticeStore } from "../../store/practiceStore";

const TextCursor = () => {
    const isStarted = usePracticeStore((state) => state.isStarted);
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const isWrong = usePracticeStore((state) => state.isWrong);

    if (isCompleted) {
        return null;
    }

    return (
        <span
            className={`${isWrong ? "text-red-800" : "text-color3"} 
            ${!isStarted && "blinking-cursor"}`}
        >
            |
        </span>
    );
};

export default TextCursor;
