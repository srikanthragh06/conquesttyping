import { useEffect } from "react";
import MainPage from "../../components/MainPage";
import Stopwatch from "../../components/Stopwatch";
import { usePracticeStore } from "../../store/practiceStore";
import PracticeBoard from "./PracticeBoard";
import PracticeSetting from "./PracticeSetting";

const PracticePage = () => {
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const isStarted = usePracticeStore((state) => state.isStarted);
    const mode = usePracticeStore((state) => state.mode);
    const duration = usePracticeStore((state) => state.duration);
    const words = usePracticeStore((state) => state.words);
    const nCorrectWords = usePracticeStore((state) => state.nCorrectWords);
    useEffect(() => {
        console.log({ isStarted, isCompleted });
    }, [isStarted, isCompleted]);

    return (
        <MainPage hasNavbar={true} className="items-center">
            <PracticeSetting />
            <div
                className={`w-full lg:w-2/3 md:w-5/6 mt-3
                            flex justify-center px-16
                            bg-transparent
                            roboto-regular text-xl md:text-3xl lg:text-4xl 
                            lg:mb-2 md:mb-1 
                            font-extrabold
                            ${!(isStarted && !isCompleted) && "hidden"}`}
            >
                {mode === "time" ? (
                    <Stopwatch
                        start={isStarted}
                        stop={isCompleted}
                        duration={duration}
                    />
                ) : (
                    <span>
                        {nCorrectWords}/{words.length}
                    </span>
                )}
            </div>
            <PracticeBoard />
        </MainPage>
    );
};

export default PracticePage;
