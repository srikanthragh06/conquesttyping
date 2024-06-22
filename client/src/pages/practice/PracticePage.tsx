import MainPage from "../../components/MainPage";
import Stopwatch from "../../components/Stopwatch";
import { usePracticeStore } from "../../store/practiceStore";
import PracticeBoard from "./PracticeBoard";
import PracticeResults from "./PracticeResults";
import PracticeSetting from "./PracticeSetting";
import { RiRestartLine } from "react-icons/ri";

const PracticePage = () => {
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const isStarted = usePracticeStore((state) => state.isStarted);
    const mode = usePracticeStore((state) => state.mode);
    const duration = usePracticeStore((state) => state.duration);
    const words = usePracticeStore((state) => state.words);
    const nCorrectWords = usePracticeStore((state) => state.nCorrectWords);

    const reset = usePracticeStore((state) => state.reset);

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
            <PracticeResults />
            {isCompleted && isStarted && (
                <RiRestartLine
                    onClick={() => reset()}
                    className="hover:animate-spin hover:opacity-80 active:opacity-60 
                                cursor-pointer shadow-sm rounded-full 
                                mt-24 text-5xl"
                />
            )}
            <div
                className="absolute sm:bottom-[5%] bottom-[1%] 
                lg:text-sm md:text-[12px] text-[10px]  
                flex space-x-1 items-center leading-3"
            >
                <span className="bg-color2 p-1 rounded-lg opacity-60 cursor-default">
                    {"Tab + Enter"}
                </span>
                <span>-</span>
                <span className="font-bold opacity-70">restart</span>
            </div>
        </MainPage>
    );
};

export default PracticePage;
