import { useEffect, useState } from "react";
import { usePracticeStore } from "../../store/practiceStore";

const PracticeResults = () => {
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const nWrongAttempts = usePracticeStore((state) => state.nWrongAttempts);

    const getTimeTaken = usePracticeStore((state) => state.getTimeTaken);
    const getNCorrectChars = usePracticeStore(
        (state) => state.getNCorrectChars
    );
    const getAccuracy = usePracticeStore((state) => state.getAccuracy);
    const getWPM = usePracticeStore((state) => state.getWPM);
    const getCPM = usePracticeStore((state) => state.getCPM);
    const getNCharacters = usePracticeStore((state) => state.getNCharacters);
    const getNIncorrectChars = usePracticeStore(
        (state) => state.getNIncorrectChars
    );

    const [practiceResults, setPracticeResults] = useState({
        timeTaken: 0,
        accuracy: 0,
        WPM: 0,
        CPM: 0,
        nCharacters: 0,
        nCorrectChars: 0,
        nIncorrectChars: 0,
        incorrectAttempts: 0,
    });

    useEffect(() => {
        if (isCompleted)
            setPracticeResults({
                timeTaken: getTimeTaken(),
                accuracy: getAccuracy(),
                WPM: getWPM(),
                CPM: getCPM(),
                nCharacters: getNCharacters(),
                nCorrectChars: getNCorrectChars(),
                nIncorrectChars: getNIncorrectChars(),
                incorrectAttempts: nWrongAttempts,
            });
    }, [isCompleted]);

    return (
        <div
            className={`lg:mt-12 sm:mt-10 mt-12
                        lg:text-lg sm:text-base text-sm
                         ${!isCompleted && "hidden"} roboto-regular
                         flex space-x-4`}
        >
            <div
                className="flex flex-col sm:flex-row 
                       lg:px-8 lg:py-4 sm:px-6 sm:py-3 px-6 py-2
                       rounded-lg shadow-sm bg-color2 
                       lg:space-x-8 sm:space-x-5
                       lg:text-3xl sm:text-2xl text-lg 
                       lg:w-[800px] sm:w-[600px]"
            >
                <div className="flex flex-col w-full sm:w-1/2 px-2 sm:space-y-3">
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            CPM:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.CPM.toFixed(1)}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            WPM:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.WPM.toFixed(1)}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            Accuracy:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.accuracy.toFixed(1)} %
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            Time taken:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.timeTaken.toFixed(1)} s
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full sm:w-1/2 px-2 sm:space-y-3">
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            Correct characters:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.nCorrectChars}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            Typed characters:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.nCharacters}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            Incorrect characters:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.nIncorrectChars}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500 whitespace-nowrap">
                            Incorrect attempts:
                        </span>
                        <span className="text-color3 font-bold ml-4">
                            {practiceResults.incorrectAttempts}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeResults;
