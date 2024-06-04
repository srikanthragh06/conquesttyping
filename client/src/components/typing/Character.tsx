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
    const nWords = usePracticeStore((state) => state.nWords);

    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const isStarted = usePracticeStore((state) => state.isStarted);

    const style: CSSProperties = {};

    if (wordCursor > wordIndex) {
        if (isWrong) {
            if (pageNumber * nWords + wordIndex > wrongWordIndex) {
                style.color = "#ba3232";
            } else if (pageNumber * nWords + wordIndex < wrongWordIndex) {
                style.color = "#76ABAE";
            } else {
                if (characterIndex >= wrongCharacterIndex) {
                    style.color = "#ba3232";
                } else {
                    style.color = "#76ABAE";
                }
            }
        } else {
            style.color = "#76ABAE";
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
                    style.color = "#76ABAE";
                } else {
                    style.color = "#ba3232";
                }
            } else {
                style.color = "#76ABAE";
            }
        }
    } else {
        style.color = "grey";
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
