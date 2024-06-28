import FormInput from "../../components/FormInput";
import FormInputPassword from "../../components/FormInputPassword";
import FormButton from "../../components/FormButton";
import FormError from "../../components/FormError";
import FormMessage from "../../components/FormMessage";
import useSignup from "../../hooks/auth/useSignup";

const Signup = () => {
    const {
        emailRef,
        passwordRef,
        confirmPasswordRef,
        signupError,
        signupMessage,
        signupIsLoading,
        handleSignup,
    } = useSignup();

    return (
        <div
            className="flex flex-col items-center 
                space-y-6
                sm:w-[500px] w-5/6
                py-1 px-2"
        >
            <h1 className="text-3xl font-bold w-full text-center">Sign up</h1>
            <form
                className="flex flex-col items-center space-y-3 w-full"
                onSubmit={(e) => handleSignup(e)}
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
                <FormInputPassword
                    ref={confirmPasswordRef}
                    divClassName="w-full"
                    placeholder="Confirm Password"
                />
                <FormError>{signupError}</FormError>
                <FormMessage>{signupMessage}</FormMessage>
                <FormButton
                    isLoading={signupIsLoading}
                    className="sm:w-1/2 w-5/6"
                >
                    Sign up
                </FormButton>
            </form>
        </div>
    );
};

export default Signup;
