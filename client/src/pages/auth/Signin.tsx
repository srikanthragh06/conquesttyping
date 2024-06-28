import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormInputPassword from "../../components/FormInputPassword";
import useSignin from "../../hooks/auth/useSignin";
import FormError from "../../components/FormError";
import FormMessage from "../../components/FormMessage";
import FormButton from "../../components/FormButton";
import useGoogleAuth from "../../hooks/typing/useGoogleAuth";
import GoogleAuthButton from "../../components/GoogleAuthButton";

const Signin = () => {
    const navigate = useNavigate();

    const {
        emailRef,
        passwordRef,
        signinError,
        signinMessage,
        signinIsLoading,
        handleSignin,
    } = useSignin();

    const { handleGoogleSignin, googleAuthError, googleAuthIsLoading } =
        useGoogleAuth();

    return (
        <div
            className="flex flex-col items-center
                        sm:w-[500px] w-5/6
                        py-1 px-2"
        >
            <h1 className="text-3xl font-bold w-full text-center mb-6">
                Sign in
            </h1>
            <form
                className="flex flex-col items-center space-y-3 w-full"
                onSubmit={(e) => handleSignin(e)}
            >
                <FormInput
                    ref={emailRef}
                    type="email"
                    placeholder="Email Address"
                    className="w-full"
                />
                <FormInputPassword
                    ref={passwordRef}
                    divClassName="w-full"
                    placeholder="Password (8-32 characters)"
                />
                <p className="w-full text-sm">
                    <span
                        onClick={() => navigate("/forgot-password")}
                        className="opacity-60 hover:opacity-40 transition cursor-pointer"
                    >
                        Forgot Password?
                    </span>
                </p>
                {signinError && <FormError>{signinError}</FormError>}
                {signinMessage && <FormMessage>{signinMessage}</FormMessage>}
                <FormButton
                    isLoading={signinIsLoading}
                    className="sm:w-1/2 w-5/6"
                >
                    Sign In
                </FormButton>
            </form>

            <p className="text-color4 opacity-60 text-lg mb-6 mt-3">
                {Array(7).fill("--").join("")} or {Array(7).fill("--").join("")}
            </p>
            <div className="flex flex-col items-center w-full">
                <GoogleAuthButton
                    handleGoogleSignin={handleGoogleSignin}
                    isLoading={googleAuthIsLoading}
                    className="sm:w-1/2 w-5/6"
                />
                {googleAuthError && <FormError>{googleAuthError}</FormError>}
            </div>
        </div>
    );
};

export default Signin;
