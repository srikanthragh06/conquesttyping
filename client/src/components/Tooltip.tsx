import React from "react";

type TooltipProps = {
    children: React.ReactNode;
    content: string;
};

const Tooltip = ({ children, content }: TooltipProps) => {
    return (
        <div className="relative flex flex-col items-center group">
            {children}
            <div className="absolute top-full flex-col items-center hidden mt-2 group-hover:flex">
                <div
                    className="relative z-10 p-2 text-xs 
                                leading-none text-color4 whitespace-no-wrap 
                                 bg-gray-900 shadow-lg rounded-md"
                >
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
