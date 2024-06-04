type SelectorTypes<T extends string | number | boolean> = {
    option: T;
    state: T;
    set: (value: T) => void;
    displayOption?: (option: T) => React.ReactNode;
};

const Selector = <T extends string | number | boolean>({
    option,
    state,
    set,
    displayOption,
}: SelectorTypes<T>) => {
    return (
        <span
            onClick={() => set(option)}
            className={`cursor-pointer 
            ${
                state !== option
                    ? "hover:opacity-25 active:opacity-10 opacity-40"
                    : "hover:opacity-85 active:opacity-70 opacity-100 text-color3 font-bold"
            }
                    transition
            `}
        >
            {displayOption ? displayOption(option) : option}
        </span>
    );
};

export default Selector;
