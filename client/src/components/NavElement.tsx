import React, { ElementType } from "react";
import Tooltip from "./Tooltip";

type ClickHandler<T extends HTMLElement> = (
    event: React.MouseEvent<T, MouseEvent>
) => void;

type NavElementProps = {
    className?: string;
    Logo: ElementType;
    text: string;
    onClick?: ClickHandler<HTMLDivElement>;
};

const NavElement = ({
    className = "",
    Logo,
    text,
    onClick = () => {},
}: NavElementProps) => {
    return (
        <Tooltip content={text}>
            <div
                onClick={onClick}
                className={`flex items-center justify-between space-x-1 
                cursor-pointer hover:opacity-60 transition ${className}`}
            >
                <Logo
                    className={`md:text-3xl text-2xl 
                                cursor-pointer hover:opacity-80 active:opacity-60 transition ${className}`}
                />
            </div>
        </Tooltip>
    );
};

export default NavElement;
