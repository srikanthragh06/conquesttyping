import CTTitleLogo from "./CTTitleLogo";
import { FaKeyboard } from "react-icons/fa";
// import { GiBattleGear } from "react-icons/gi";
// import { IoPeopleCircleSharp } from "react-icons/io5";
// import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
// import { IoPersonSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
// import { IoMdSettings } from "react-icons/io";

import { MdLeaderboard } from "react-icons/md";
// import { IoSearchSharp } from "react-icons/io5";

import NavElement from "./NavElement";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { removeAuthToken } from "../utils/token";
import { TfiStatsUp } from "react-icons/tfi";

const Navbar = () => {
    const navigate = useNavigate();

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const removeUserDetails = useAuthStore((state) => state.removeUserDetails);

    const handleLogout = () => {
        removeUserDetails();
        setIsLoggedIn(false);
        removeAuthToken();
        navigate("/auth");
    };

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
                <NavElement
                    Logo={FaKeyboard}
                    text="Practice"
                    onClick={() => navigate("/")}
                />
                <NavElement
                    Logo={MdLeaderboard}
                    text="Leaderboard"
                    onClick={() => navigate("/leaderboard")}
                />
                {/* <NavElement Logo={IoSearchSharp} text="Search" /> */}
                {/* <NavElement Logo={GiBattleGear} text="Compete" /> */}
                <NavElement
                    Logo={TfiStatsUp}
                    text="Statistics"
                    onClick={() => {
                        navigate("/statistics");
                    }}
                />
                {/* <NavElement Logo={IoPersonSharp} text="Settings" /> */}
                {/* {isLoggedIn && (
                    <NavElement Logo={IoMdSettings} text="Settings" />
                )} */}
                {isLoggedIn ? (
                    <NavElement
                        Logo={FiLogOut}
                        text="Sign out"
                        onClick={() => {
                            handleLogout();
                            navigate("/auth");
                        }}
                    />
                ) : (
                    <NavElement
                        Logo={FiLogIn}
                        text="Signin"
                        onClick={() => navigate("/auth")}
                    />
                )}
            </div>
        </div>
    );
};

export default Navbar;
