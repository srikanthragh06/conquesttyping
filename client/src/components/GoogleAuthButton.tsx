import FormButton from "./FormButton";
import { FcGoogle } from "react-icons/fc";

const GoogleAuthButton = ({
    handleGoogleSignin,
    isLoading,
    className = "",
}: {
    handleGoogleSignin: () => void;
    isLoading: boolean;
    className?: string;
}) => {
    return (
        <FormButton
            className={`py-2 px-2 flex space-x-2 ${className}`}
            onClick={() => handleGoogleSignin()}
            isLoading={isLoading}
        >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
        </FormButton>
    );
};

export default GoogleAuthButton;
