import { usePracticeStore } from "../../store/practiceStore";
import Character from "./Character";
import Space from "./Space";
import TextCursor from "./TextCursor";

type WordProps = { word: string; wordIndex: number };

const Word = ({ word, wordIndex }: WordProps) => {
    const curWords = usePracticeStore((state) => state.curWords);

    const wordCursor = usePracticeStore((state) => state.wordCursor);
    const characterCursor = usePracticeStore((state) => state.characterCursor);

    return (
        <span className={`my-2`}>
            {[...word].map((char, characterIndex) => {
                return (
                    <Character
                        wordIndex={wordIndex}
                        characterIndex={characterIndex}
                        character={char}
                        key={`${wordIndex}-${characterIndex}`}
                    />
                );
            })}
            {wordCursor === wordIndex &&
                characterCursor === curWords[wordCursor].length && (
                    <TextCursor />
                )}
            <Space wordIndex={wordIndex} />
        </span>
    );
};

export default Word;
