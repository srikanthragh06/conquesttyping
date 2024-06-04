import { CSSProperties } from "react";
import { usePracticeStore } from "../../store/practiceStore";

const Space = ({ wordIndex }: { wordIndex: number }) => {
    const isWrong = usePracticeStore((state) => state.isWrong);
    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const nWords = usePracticeStore((state) => state.nWords);
    const pageNumber = usePracticeStore((state) => state.pageNumber);
    const wrongWordIndex = usePracticeStore((state) => state.wrongWordIndex);

    const style: CSSProperties = {};

    if (isWrong) {
        if (
            wordIndex < wordCursor &&
            nWords * pageNumber + wordIndex >= wrongWordIndex
        ) {
            style.backgroundColor = "#ba3232";
        }
    }
    return <span style={style}>&nbsp;</span>;
};

export default Space;
