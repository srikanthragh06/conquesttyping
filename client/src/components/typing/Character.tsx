import { CSSProperties } from "react";
import { usePracticeStore } from "../../store/practiceStore";
import TextCursor from "./TextCursor";

type CharacterProps = {
    character: string;
    wordIndex: number;
    characterIndex: number;
};

const Character = ({
    character,
    wordIndex,
    characterIndex,
}: CharacterProps) => {
    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const characterCursor = usePracticeStore((state) => state.characterCursor);

    const isWrong = usePracticeStore((state) => state.isWrong);
    const wrongWordIndex = usePracticeStore((state) => state.wrongWordIndex);
    const wrongCharacterIndex = usePracticeStore(
        (state) => state.wrongCharacterIndex
    );

    const pageNumber = usePracticeStore((state) => state.pageNumber);
    const words = usePracticeStore((state) => state.words);
    const nWords = usePracticeStore((state) => state.nWords);
    const mode = usePracticeStore((state) => state.mode);
    const typed = usePracticeStore((state) => state.typed);

    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const isStarted = usePracticeStore((state) => state.isStarted);
    const findTrueIndex = usePracticeStore((state) => state.findTrueIndex);

    const style: CSSProperties = {};
    const wrongColor = "#ba3232";
    const correctColor = "#76ABAE";

    if (mode === "words") {
        if (wordCursor > wordIndex) {
            if (isWrong) {
                if (pageNumber * nWords + wordIndex > wrongWordIndex) {
                    style.color = wrongColor;
                } else if (pageNumber * nWords + wordIndex < wrongWordIndex) {
                    style.color = correctColor;
                } else {
                    if (characterIndex >= wrongCharacterIndex) {
                        style.color = wrongColor;
                    } else {
                        style.color = correctColor;
                    }
                }
            } else {
                style.color = correctColor;
            }
        } else if (wordCursor === wordIndex) {
            if (isStarted && !isCompleted) {
                style.textDecoration = "underline";
            }
            if (characterIndex >= characterCursor) {
                style.color = "grey";
            } else {
                if (isWrong) {
                    if (
                        characterIndex < wrongCharacterIndex &&
                        wrongWordIndex === pageNumber * nWords + wordCursor
                    ) {
                        style.color = correctColor;
                    } else {
                        style.color = wrongColor;
                    }
                } else {
                    style.color = correctColor;
                }
            }
        } else {
            style.color = "grey";
        }
    } else {
        if (
            wordIndex < wordCursor ||
            (wordIndex === wordCursor && characterIndex < characterCursor)
        ) {
            const trueIndex = findTrueIndex(wordIndex, characterIndex);

            if (
                typed[trueIndex] ===
                words[nWords * pageNumber + wordIndex][characterIndex]
            )
                style.color = correctColor;
            else style.color = wrongColor;
        } else {
            style.color = "grey";
        }
    }

    return (
        <span className={`cursor-default`} style={style}>
            {wordCursor === wordIndex && characterIndex === characterCursor && (
                <TextCursor />
            )}
            {character === " " ? "\u00A0" : character}
        </span>
    );
};

export default Character;
