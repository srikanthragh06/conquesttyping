import { usePracticeStore } from "../../store/practiceStore";
import useTyping from "../../hooks/typing/useTyping";
import Word from "../../components/typing/Word";

const PracticeBoard = () => {
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const curWords = usePracticeStore((state) => state.curWords);

    useTyping();

    return (
        <div
            className={`mt-3 flex justify-center flex-wrap 
            roboto-regular text-xl md:text-2xl lg:text-3xl
            w-full lg:w-2/3 md:w-5/6
            bg-color2 rounded-lg 
            md:px-8 md:py-4 px-4 py-2
            ${!isCompleted && `select-none`}`}
        >
            {!isCompleted &&
                curWords.map((word, wordIndex) => {
                    return (
                        <Word
                            key={wordIndex}
                            word={word}
                            wordIndex={wordIndex}
                        />
                    );
                })}
        </div>
    );
};

export default PracticeBoard;
