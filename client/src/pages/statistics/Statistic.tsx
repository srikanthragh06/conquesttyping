const Statistic = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex flex-col items-center">
            <span
                className="lg:text-lg md:text-base text-sm 
                            opacity-40"
            >
                {label}
            </span>
            <span className="lg:text-4xl md:text-2xl text-lg font-medium text-color4 opacity-80">
                {value}
            </span>
        </div>
    );
};

export default Statistic;
