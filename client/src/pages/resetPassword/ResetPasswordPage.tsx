import FormButton from "../../components/FormButton";
import FormError from "../../components/FormError";
import FormInputPassword from "../../components/FormInputPassword";
import FormMessage from "../../components/FormMessage";
import MainPage from "../../components/MainPage";
import useResetPassword from "../../hooks/auth/useResetPassword";

const ResetPasswordPage = () => {
    const {
        newPasswordRef,
        confirmNewPasswordRef,
        resetPasswordError,
        resetPasswordMessage,
        resetPasswordIsLoading,
        handleResetPassword,
    } = useResetPassword();

    return (
        <MainPage
            className="items-center"
            hasNavbar={true}
            authRequired={false}
            noAuthRequired={true}
        >
            <h1 className="text-4xl font-bold mb-10 mt-40">Reset Password</h1>
            <form
                onSubmit={(e) => handleResetPassword(e)}
                className="flex flex-col items-center space-y-3 border- 
                            sm:w-[500px] w-5/6"
            >
                <FormInputPassword
                    placeholder="New Password"
                    ref={newPasswordRef}
                />
                <FormInputPassword
                    placeholder="Confirm New Password"
                    ref={confirmNewPasswordRef}
                />
                {resetPasswordError && (
                    <FormError>{resetPasswordError}</FormError>
                )}
                {resetPasswordMessage && (
                    <FormMessage>{resetPasswordMessage}</FormMessage>
                )}
                <FormButton
                    className="sm:w-1/2 w-5/6"
                    isLoading={resetPasswordIsLoading}
                >
                    Reset Password
                </FormButton>
            </form>
        </MainPage>
    );
};

export default ResetPasswordPage;
