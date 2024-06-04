import { create } from "zustand";

type PracticeStoreType = {
    nWords: number;
    words: string[];
    curWords: string[];

    pageNumber: number;
    wordCursor: number;
    characterCursor: number;

    isStarted: boolean;
    isCompleted: boolean;

    wrongWordIndex: number;
    wrongCharacterIndex: number;
    isWrong: boolean;

    nCorrectWords: number;
    nWrongAttempts: number;

    startTime: Date;
    endTime: Date;
    duration: number;

    mode: "time" | "words";

    reset: () => void;

    startTyping: () => void;
    completeTyping: () => void;

    nextPage: () => void;
    prevPage: () => void;

    handleKeyPress: (event: KeyboardEvent) => void;
    handleKeyDown: (
        event: KeyboardEvent,
        lastKeyTab: boolean,
        setLastKeyTab: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
};

export const usePracticeStore = create<PracticeStoreType>((set, get) => {
    return {
        nWords: 30,
        words: [],
        curWords: [
            "sunset",
            "horizon",
            "orange",
            "pink",
            "birds",
            "chirped",
            "tranquil",
            "serene",
            "atmosphere",
            "breeze",
            "leaves",
            "evening",
            "stars",
            "magic",
            "scene",
        ],

        pageNumber: 0,
        wordCursor: 0,
        characterCursor: 0,

        isStarted: false,
        isCompleted: false,

        wrongWordIndex: 0,
        wrongCharacterIndex: 0,
        isWrong: false,

        nCorrectWords: 0,
        nWrongAttempts: 0,

        startTime: new Date(),
        endTime: new Date(),
        duration: 60,

        mode: "time",

        reset: () => {
            const wordsArray = [
                "apple",
                "banana",
                "cherry",
                "date",
                "elderberry",
                "fig",
                "grape",
                "honeydew",
                "kiwi",
                "lemon",
                "mango",
                "nectarine",
                "orange",
                "papaya",
                "quince",
                "raspberry",
                "strawberry",
                "tangerine",
                "ugli",
                "violet",
                "watermelon",
                "xigua",
                "yam",
                "zucchini",
                "avocado",
                "blueberry",
                "cranberry",
                "dragonfruit",
                "eggplant",
                "fennel",
                "grapefruit",
                "huckleberry",
                "iceberg",
                "jalapeno",
                "kale",
                "lime",
                "mulberry",
                "navel",
                "olive",
                "peach",
                "plum",
                "quinoa",
                "radish",
                "spinach",
                "tomato",
                "ugni",
                "valencia",
                "walnut",
                "xylocarp",
                "yogurt",
            ];

            set((state) => ({
                ...state,
                words: wordsArray,
                curWords: wordsArray.slice(0, state.nWords),

                isStarted: false,
                isCompleted: false,

                pageNumber: 0,
                wordCursor: 0,
                characterCursor: 0,

                wrongWordIndex: 0,
                wrongCharacterIndex: 0,

                isWrong: false,

                nCorrectWords: 0,
                nWrongAttempts: 0,
            }));
        },

        startTyping: () => {
            set((state) => {
                if (
                    state.wordCursor === 0 &&
                    state.characterCursor > 0 &&
                    !state.isStarted
                )
                    return { ...state, isStarted: true, startTime: new Date() };
                else return { ...state };
            });
        },

        completeTyping: () => {
            set((state) => {
                if (
                    (state.mode === "words" &&
                        state.pageNumber * state.nWords + state.wordCursor ===
                            state.words.length - 1 &&
                        state.characterCursor ===
                            state.words[state.words.length - 1].length &&
                        state.words.length > 0 &&
                        !state.isWrong &&
                        state.isStarted &&
                        !state.isCompleted) ||
                    (state.mode === "time" &&
                        state.endTime.getTime() - state.startTime.getTime() >=
                            state.duration * 1000 &&
                        state.words.length > 0 &&
                        state.isStarted &&
                        !state.isCompleted)
                ) {
                    return {
                        ...state,
                        isCompleted: true,
                        endTime: new Date(),
                    };
                } else {
                    return { ...state };
                }
            });
        },

        nextPage: () => {
            set((state) => {
                const startIndex = (state.pageNumber + 1) * state.nWords;
                const nextWords = state.words.slice(
                    startIndex,
                    startIndex + state.nWords
                );
                return {
                    ...state,
                    curWords: nextWords,
                    pageNumber: state.pageNumber + 1,
                    wordCursor: 0,
                    characterCursor: 0,
                };
            });
        },
        prevPage: () => {
            set((state) => {
                const startIndex = Math.max(
                    (state.pageNumber - 1) * state.nWords,
                    0
                );
                const prevWords = state.words.slice(
                    startIndex,
                    startIndex + state.nWords
                );
                return {
                    ...state,
                    curWords: prevWords,
                    pageNumber: Math.max(state.pageNumber - 1, 0),
                    wordCursor:
                        state.pageNumber !== 0
                            ? state.nWords - 1
                            : state.wordCursor,
                    characterCursor:
                        state.pageNumber !== 0
                            ? state.words[
                                  (state.pageNumber - 1) * state.nWords +
                                      state.nWords -
                                      1
                              ].length
                            : state.characterCursor,
                };
            });
        },

        handleKeyPress: (event: KeyboardEvent) => {
            const state = get();
            const {
                isCompleted,
                characterCursor,
                words,
                curWords,
                pageNumber,
                nWords,
                wordCursor,
                isWrong,
            } = state;

            // If someone types characters inside a text box, do not acknowledge such input.
            if (
                event.target instanceof HTMLElement &&
                event.target.nodeName == "INPUT"
            )
                return;

            // Ignore 'Delete' & 'Enter' key events
            const ignoreKeysList = ["Delete", "Enter"];
            if (ignoreKeysList.includes(event.key)) return;

            // Ignore handle inputs if the test is complete
            if (isCompleted) return;

            // if the user's isn't on a space
            if (characterCursor < curWords[wordCursor].length) {
                // if the user struck an incorrect key
                if (event.key !== curWords[wordCursor][characterCursor]) {
                    // if the test isnt in the wrong state,
                    // set the test to the wrong state
                    // set the wrong word and character index to the current word and character index
                    if (!isWrong)
                        set((state) => ({
                            ...state,
                            isWrong: true,
                            wrongWordIndex: pageNumber * nWords + wordCursor,
                            wrongCharacterIndex: characterCursor,
                        }));

                    // Increment the number of wrong attempts
                    set((state) => ({
                        ...state,
                        nWrongAttempts: state.nWrongAttempts + 1,
                    }));
                }

                // if
                // -the test isnt in the wrong state and
                // -the user has struck the correct key
                // Not sure what it does
                if (
                    !isWrong &&
                    event.key === curWords[wordCursor][characterCursor] &&
                    pageNumber * nWords + wordCursor === words.length - 1 &&
                    characterCursor ===
                        words[pageNumber * nWords + wordCursor].length - 1
                )
                    set((state) => ({ ...state, nCorrectWords: words.length }));

                // Increment the characterCursor
                set((state) => ({
                    ...state,
                    characterCursor: state.characterCursor + 1,
                }));
            }
            // if the user is on a space
            else if (characterCursor === curWords[wordCursor].length) {
                // if the user did not strike space despite being on a space
                if (event.key !== " ") {
                    // if the user isnt in the wrong state then
                    // - turn the wrong state to true
                    // - set the current wrong word and character cursor to the current cursor
                    if (!isWrong)
                        set((state) => ({
                            ...state,
                            isWrong: true,
                            wrongWordIndex: pageNumber * nWords + wordCursor,
                            wrongCharacterIndex: characterCursor,
                        }));

                    // Increment the number wrong attempts
                    set((state) => ({
                        ...state,
                        nWrongAttempts: state.nWrongAttempts + 1,
                    }));
                }

                // if the user was on the space of the last of the page then move to the next page
                // else just increment the word cursor and set character cursor to 0
                if (wordCursor % nWords === nWords - 1) state.nextPage();
                else
                    set((state) => ({
                        ...state,
                        wordCursor: state.wordCursor + 1,
                        characterCursor: 0,
                    }));

                // if the test is not a wrong state and the user typed space then
                // increment the number of correct words
                if (!isWrong && event.key === " ")
                    set((state) => ({
                        ...state,
                        nCorrectWords: state.nCorrectWords + 1,
                    }));
            }

            // Discard the default actions that could happen because of typing space
            if (event.key === " ") event.preventDefault();
        },
        handleKeyDown: (
            event: KeyboardEvent,
            lastKeyTab: boolean,
            setLastKeyTab: React.Dispatch<React.SetStateAction<boolean>>
        ) => {
            const state = get();
            const {
                characterCursor,
                isStarted,
                isCompleted,
                reset,
                wrongWordIndex,
                wrongCharacterIndex,
                wordCursor,
                pageNumber,
                nWords,
                isWrong,
                words,
                curWords,
                prevPage,
            } = state;

            // If someone types characters inside a text box, do not acknowledge such input.
            if (
                event.target instanceof HTMLElement &&
                event.target.nodeName == "INPUT"
            )
                return;

            // Handles tab+enter restart mechanism
            if (event.key === "Tab") {
                event.preventDefault();
                setLastKeyTab(true);
            } else {
                if (lastKeyTab && event.key === "Enter") {
                    event.preventDefault();
                    reset();
                }
                setLastKeyTab(false);
            }

            // if the test hasnt started or is already isCompleted, ignore all inputs
            if (!isStarted) return;
            if (isCompleted) return;

            // if the user pressed backspace
            if (event.key === "Backspace") {
                // if the backspace was pressed with ctrl held
                if (event.ctrlKey) {
                    // if the user was in the first character of a word
                    if (characterCursor === 0) {
                        // if the previous was the wrong word then
                        // set wrong state to false
                        if (
                            wrongWordIndex ===
                                pageNumber * nWords + wordCursor - 1 &&
                            isWrong
                        ) {
                            set((state) => ({ ...state, isWrong: false }));
                        }

                        // if currently in wrong state
                        if (isWrong) {
                            // if user in first word of the page then go to previous available page
                            if (wordCursor === 0) prevPage();
                            // decrement the wordCursor otherwise
                            else
                                set((state) => ({
                                    ...state,
                                    wordCursor: state.wordCursor - 1,
                                }));
                            // make characterCursor 0
                            set((state) => ({ ...state, characterCursor: 0 }));
                        }
                    } else {
                        // if in wrong state and if cursor word is in wrong word index then
                        // set wrong state as false
                        if (
                            wrongWordIndex ===
                                pageNumber * nWords + wordCursor &&
                            isWrong
                        )
                            set((state) => ({ ...state, isWrong: false }));
                        // set characterCursor as 0 regardless
                        set((state) => ({ ...state, characterCursor: 0 }));
                    }
                    // if ctrl was not used
                } else {
                    // the user was on the first character of the word
                    if (characterCursor === 0) {
                        // if
                        // -user is on first word of page
                        // -page is not the first page
                        // -the last space of the previous page is the wrong index
                        // -wrong state is true then
                        // set wrong state as false
                        if (
                            wordCursor === 0 &&
                            pageNumber > 0 &&
                            wrongWordIndex ===
                                (pageNumber - 1) * nWords + nWords - 1 &&
                            wrongCharacterIndex ===
                                words[wrongWordIndex].length &&
                            isWrong
                        )
                            set((state) => ({ ...state, isWrong: false }));
                        // if
                        // -cursor word is not first word of the page
                        // -the closest space from the left is the wrong indexedDB
                        // -in wrong state
                        // set wrong state to false
                        if (
                            wordCursor !== 0 &&
                            wrongCharacterIndex ===
                                curWords[wordCursor - 1].length &&
                            wrongWordIndex ===
                                pageNumber * nWords + wordCursor - 1 &&
                            isWrong
                        )
                            set((state) => ({ ...state, isWrong: false }));

                        // if wrong state is true
                        if (isWrong) {
                            // if cursor word is first word of the page
                            // then move to previous page
                            if (wordCursor === 0) prevPage();
                            // if not
                            // set character cursor to the space of the previous word
                            // decrement wordCursor
                            else
                                set((state) => ({
                                    ...state,
                                    characterCursor:
                                        curWords[wordCursor - 1].length,
                                    wordCursor: state.wordCursor - 1,
                                }));
                        }
                        // if characterCursor is not 0
                    } else {
                        // if
                        // - wrong character index is 1 left to the Cursor
                        // - in wrong state
                        // set is wrong as false
                        if (
                            wrongCharacterIndex === characterCursor - 1 &&
                            wrongWordIndex ===
                                pageNumber * nWords + wordCursor &&
                            isWrong
                        )
                            set((state) => ({ ...state, isWrong: false }));
                        // decrement character cursor
                        set((state) => ({
                            ...state,
                            characterCursor: state.characterCursor - 1,
                        }));
                    }
                }
            }
        },
    };
});
