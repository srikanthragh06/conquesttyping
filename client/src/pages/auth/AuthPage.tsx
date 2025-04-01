// import { useState } from "react";
import { useState } from "react";
// import CTPicLogo from "../../components/CTPicLogo";
import MainPage from "../../components/MainPage";
import Signin from "./Signin";
import Signup from "./Signup";

const AuthPage = () => {
    const [isUserSignin, setIsUserSignin] = useState(true);

    return (
        <MainPage
            hasNavbar={true}
            className="items-center"
            authRequired={false}
            noAuthRequired={true}
        >
            {/* <CTPicLogo
                className="md:w-[100px] w-[75px]
                                mb-12 mt-4"
            /> */}
            {isUserSignin ? <Signin /> : <Signup />}

            {isUserSignin ? (
                <p className="w-full text-center sm:text-base text-sm opacity-75 mt-10">
                    New to{" "}
                    <span className="orbitron font-bold">
                        <span className="text-color3 font-bold">G</span>{" "}
                        <span className="text-color4 font-bold">Typing</span>
                    </span>
                    ?{" "}
                    <span
                        className="hover:text-color3 transition cursor-pointer"
                        onClick={() => setIsUserSignin(false)}
                    >
                        Sign up here!
                    </span>
                </p>
            ) : (
                <p className="w-full text-center sm:text-base text-sm opacity-75 mt-10">
                    Already have an account with{" "}
                    <span className="orbitron font-bold">
                        <span className="text-color4 font-bold">G</span>{" "}
                        <span className="text-color3 font-bold">Typing</span>
                    </span>
                    ?{" "}
                    <span
                        className="hover:text-color3 transition cursor-pointer"
                        onClick={() => setIsUserSignin(true)}
                    >
                        Sign in here!
                    </span>
                </p>
            )}
        </MainPage>
    );
};

export default AuthPage;
