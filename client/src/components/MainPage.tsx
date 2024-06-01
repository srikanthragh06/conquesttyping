import { ReactNode } from "react";
import Navbar from "./Navbar";

type MainPageProps = {
    children?: ReactNode;
    className?: string;
    hasNavbar: boolean;
};

const MainPage = ({ children, className = "", hasNavbar }: MainPageProps) => {
    return (
        <div
            className={`w-full h-full 
                        flex flex-col
                        overflow-x-hidden
                        ${className}`}
        >
            {hasNavbar && <Navbar />}
            {children}
        </div>
    );
};

export default MainPage;
