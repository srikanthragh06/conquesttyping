type CTTitleLogoProps = { className?: string };

const CTTitleLogo = ({ className = "" }: CTTitleLogoProps) => {
    return (
        <div
            className={`orbitron lg:text-4xl md:text-3xl sm:text-2xl text-xl
                        hidden sm:flex justify-center items-center ${className}`}
        >
            <span className="text-color3 font-bold">G</span> &nbsp;
            <span className="text-color4 font-bold">Typing</span>
        </div>
    );
};

export default CTTitleLogo;
