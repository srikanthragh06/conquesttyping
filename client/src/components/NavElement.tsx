import { ElementType } from "react";
import Tooltip from "./Tooltip";

type NavElementProps = {
    className?: string;
    Logo: ElementType;
    text: string;
};

const NavElement = ({ className = "", Logo, text }: NavElementProps) => {
    return (
        <Tooltip content={text}>
            <div
                className={`flex items-center justify-between space-x-1 
                cursor-pointer hover:opacity-60 transition ${className}`}
            >
                <Logo
                    className="md:text-3xl text-2xl 
                                space-x-1 
                                cursor-pointer hover:opacity-60 transition ${className}"
                />
            </div>
        </Tooltip>
    );
};

export default NavElement;
