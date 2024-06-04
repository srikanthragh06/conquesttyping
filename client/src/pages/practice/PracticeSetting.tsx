import Selector from "../../components/Selector";
import { usePracticeStore } from "../../store/practiceStore";

const setMode = (mode: "time" | "words") => {
    usePracticeStore.setState((state) => ({ ...state, mode }));
};
const setDuration = (duration: number) => {
    usePracticeStore.setState((state) => ({ ...state, duration }));
};

const PracticeSetting = () => {
    const mode = usePracticeStore((state) => state.mode);
    const duration = usePracticeStore((state) => state.duration);
    const isStarted = usePracticeStore((state) => state.isStarted);

    return (
        <div
            className={`flex justify-evenly 
            lg:space-x-12 md:space-x-8 space-x-4
            roboto-regular text-base md:text-lg lg:text-2xl
            bg-transparent rounded-lg 
            px-4 py-2
            lg:mt-3 md:mt-2
             ${isStarted && "hidden"}`}
        >
            <span className="flex lg:space-x-6 md:space-x-4 space-x-2">
                <Selector option="words" state={mode} set={setMode} />
                <Selector option="time" state={mode} set={setMode} />
            </span>
            <span className="opacity-30">|</span>
            <span className="flex lg:space-x-6 md:space-x-4 space-x-2">
                <Selector option={30} state={duration} set={setDuration} />
                <Selector option={60} state={duration} set={setDuration} />
                <Selector option={90} state={duration} set={setDuration} />
                <Selector option={120} state={duration} set={setDuration} />
                <Selector option={180} state={duration} set={setDuration} />
            </span>
        </div>
    );
};

export default PracticeSetting;
