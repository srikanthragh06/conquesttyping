import MainPage from "../../components/MainPage";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import FormError from "../../components/FormError";
import FormMessage from "../../components/FormMessage";

const ForgotPasswordPage = () => {
    const {
        emailRef,
        forgotPasswordError,
        forgotPasswordMessage,
        forgotPasswordIsLoading,
        handleForgotPassword,
    } = useForgotPassword();

    return (
        <MainPage
            hasNavbar={true}
            authRequired={false}
            noAuthRequired={true}
            className="items-center"
        >
            <h1 className="text-4xl font-bold mb-16 mt-40">Forgot Password</h1>
            <p className="text-base text-center opacity-60 mb-4">
                Lost your password? Please enter the email address associated
                with your account. You will receive a link to create a new
                password via email.
            </p>
            <form
                onSubmit={(e) => handleForgotPassword(e)}
                className="flex flex-col items-center space-y-3 border- 
                            sm:w-[500px] w-5/6"
            >
                <FormInput
                    ref={emailRef}
                    type="email"
                    placeholder="Email Address"
                    className="w-full"
                />
                {forgotPasswordError && (
                    <FormError>{forgotPasswordError}</FormError>
                )}
                {forgotPasswordMessage && (
                    <FormMessage>{forgotPasswordMessage}</FormMessage>
                )}
                <FormButton
                    className="sm:w-1/2 w-5/6"
                    isLoading={forgotPasswordIsLoading}
                >
                    Reset Password
                </FormButton>
            </form>
        </MainPage>
    );
};

export default ForgotPasswordPage;
