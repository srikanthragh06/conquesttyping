import { CSSProperties } from "react";
import { usePracticeStore } from "../../store/practiceStore";

const Space = ({ wordIndex }: { wordIndex: number }) => {
    const isWrong = usePracticeStore((state) => state.isWrong);
    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const nWords = usePracticeStore((state) => state.nWords);
    const pageNumber = usePracticeStore((state) => state.pageNumber);
    const wrongWordIndex = usePracticeStore((state) => state.wrongWordIndex);
    const mode = usePracticeStore((state) => state.mode);
    const words = usePracticeStore((state) => state.words);
    const typed = usePracticeStore((state) => state.typed);

    const wrongColor = "#ba3232";

    const style: CSSProperties = {};
    if (mode === "words") {
        if (isWrong) {
            if (
                wordIndex < wordCursor &&
                nWords * pageNumber + wordIndex >= wrongWordIndex
            ) {
                style.backgroundColor = wrongColor;
            }
        }
    } else {
        if (wordIndex < wordCursor) {
            let trueIndex =
                words
                    .slice(0, wordIndex + 1)
                    .reduce((sum, word) => sum + word.length, 0) + wordIndex;
            if (typed[trueIndex] !== " ") style.backgroundColor = "#ba3232";
        }
    }
    return <span style={style}>&nbsp;</span>;
};

export default Space;
