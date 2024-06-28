import React, { ReactNode } from "react";
import Loader from "./Loader";

type ClickHandler<T extends HTMLElement> = (
    event: React.MouseEvent<T, MouseEvent>
) => void;

const FormButton = ({
    children,
    className,
    isLoading,
    onClick = () => {},
    bgColor = "color2",
}: {
    children?: ReactNode;
    className?: string;
    isLoading: boolean;
    onClick?: ClickHandler<HTMLButtonElement>;
    bgColor?: string;
}) => {
    return (
        <button
            onClick={onClick}
            className={`text-lg 
                        px-2 py-1 
                        bg-${bgColor} rounded-md cursor-pointer
                        hover:opacity-50 active:opacity-30 transition 
                        flex justify-center items-center
                        ${className}`}
        >
            {isLoading ? <Loader className="text-lg" /> : children}
        </button>
    );
};

export default FormButton;
