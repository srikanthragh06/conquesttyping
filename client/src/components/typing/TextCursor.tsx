import { CSSProperties } from "react";
import { usePracticeStore } from "../../store/practiceStore";

const TextCursor = () => {
    const isStarted = usePracticeStore((state) => state.isStarted);
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const isWrong = usePracticeStore((state) => state.isWrong);
    const mode = usePracticeStore((state) => state.mode);

    if (isCompleted) {
        return null;
    }

    const wrongColor = "#ba3232";
    const correctColor = "#76ABAE";
    const style: CSSProperties = {};

    if (mode === "words" && isWrong) {
        style.color = wrongColor;
    } else style.color = correctColor;

    return (
        <span style={style} className={`${!isStarted && "blinking-cursor"}`}>
            |
        </span>
    );
};

export default TextCursor;
