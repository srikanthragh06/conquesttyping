import CTTitleLogo from "./CTTitleLogo";
import { FaKeyboard } from "react-icons/fa";
import { GiBattleGear } from "react-icons/gi";
// import { IoPeopleCircleSharp } from "react-icons/io5";
// import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";

import { MdLeaderboard } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import NavElement from "./NavElement";

const Navbar = () => {
    return (
        <div
            className="w-full flex justify-between items-center
                        lg:px-16 md:px-8 px-1
                        lg:py-4 py-1
                        bg-color2"
        >
            <CTTitleLogo />
            <div
                className="flex md:space-x-8 space-x-3 justify-evenly
                            w-full sm:w-auto
                            lg:text-xl md:text-lg text-base"
            >
                <NavElement Logo={FaKeyboard} text="Practice" />
                <NavElement Logo={IoSearchSharp} text="Search" />
                <NavElement Logo={GiBattleGear} text="Compete" />
                <NavElement Logo={MdLeaderboard} text="Leaderboards" />
                <NavElement Logo={IoPersonSharp} text="Settings" />
                <NavElement Logo={FiLogIn} text="Signin" />
            </div>
        </div>
    );
};

export default Navbar;
