import { forwardRef, useState } from "react";
import FormInput from "./FormInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormInputPasswordProps {
    placeholder?: string;
    divClassName?: string;
    inputClassName?: string;
    bgColor?: string;
}

const FormInputPassword = forwardRef<HTMLInputElement, FormInputPasswordProps>(
    (
        {
            placeholder = "Password",
            divClassName = "",
            inputClassName = "",
            bgColor = "color2",
        },
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div
                className={`w-full bg-${bgColor} rounded-md
                        flex items-center 
                        pr-2 space-x-2 
                        ${divClassName}`}
            >
                <FormInput
                    className={`w-full bg-${bgColor}
                            ${inputClassName}`}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    bgColor={bgColor}
                    ref={ref}
                />
                {showPassword ? (
                    <FaEyeSlash
                        onClick={() => setShowPassword(false)}
                        className="text-xl cursor-pointer text-color3"
                    />
                ) : (
                    <FaEye
                        onClick={() => setShowPassword(true)}
                        className="text-xl cursor-pointer text-color3"
                    />
                )}
            </div>
        );
    }
);

export default FormInputPassword;
