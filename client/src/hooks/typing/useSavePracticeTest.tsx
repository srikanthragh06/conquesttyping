import { useEffect, useState } from "react";
import { usePracticeStore } from "../../store/practiceStore";
import { addPracticeTestApi } from "../../api/practiceTests";
import { getAuthToken } from "../../utils/token";
import { useAuthStore } from "../../store/authStore";

const useSavePracticeTest = () => {
    const isCompleted = usePracticeStore((state) => state.isCompleted);
    const isStarted = usePracticeStore((state) => state.isStarted);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const mode = usePracticeStore((state) => state.mode);
    const startTime = usePracticeStore((state) => state.startTime);
    const endTime = usePracticeStore((state) => state.endTime);
    const getTimeTaken = usePracticeStore((state) => state.getTimeTaken);
    const getAccuracy = usePracticeStore((state) => state.getAccuracy);
    const getWPM = usePracticeStore((state) => state.getWPM);
    const getCPM = usePracticeStore((state) => state.getCPM);
    const getNCharacters = usePracticeStore((state) => state.getNCharacters);
    const getNCorrectChars = usePracticeStore(
        (state) => state.getNCorrectChars
    );
    const getNIncorrectChars = usePracticeStore(
        (state) => state.getNIncorrectChars
    );
    const getNCorrectWords = usePracticeStore(
        (state) => state.getNCorrectWords
    );

    const [saveTestError, setSaveTestError] = useState<string | null>(null);
    const [saveTestMessage, setSaveTestMessage] = useState<string | null>(null);
    const [saveTestIsLoading, setSaveTestIsLoading] = useState<boolean>(false);

    const handleSavePracticeTest = async () => {
        if (!(isLoggedIn && isStarted && isCompleted)) return;

        const token = getAuthToken();

        setSaveTestIsLoading(true);
        try {
            const res = await addPracticeTestApi(token as string, {
                mode,
                startTime,
                endTime,
                timeTaken: getTimeTaken(),
                accuracy: getAccuracy(),
                cpm: getCPM(),
                wpm: getWPM(),
                nCharacters: getNCharacters(),
                nCorrectCharacters: getNCorrectChars(),
                nIncorrectCharacters: getNIncorrectChars(),
                nCorrectWords: getNCorrectWords(),
            });

            if (res) {
                if (!res.data.error) {
                    setSaveTestMessage(res.data.message);
                    setSaveTestError("");
                } else {
                    setSaveTestMessage("");
                    setSaveTestError(res.data.error);
                }
            } else {
                setSaveTestMessage("");
                setSaveTestError("No response from server.");
            }
        } catch (error) {
            console.error(error);
            setSaveTestMessage("");
            setSaveTestError("Could not save test due to unknown error :(.");
        } finally {
            setSaveTestIsLoading(false);
        }
    };

    useEffect(() => {
        handleSavePracticeTest();
    }, [isCompleted, isStarted]);

    return { saveTestMessage, saveTestError, saveTestIsLoading };
};

export default useSavePracticeTest;
