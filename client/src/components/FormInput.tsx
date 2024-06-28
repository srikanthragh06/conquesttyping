import { forwardRef } from "react";

type FormInputProps = {
    bgColor?: string;
    className?: string;
    placeholder?: string;
    type?: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            bgColor = "color2",
            className = "",
            placeholder = "Type Here...",
            type = "text",
        },
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <input
                type={type}
                ref={ref}
                placeholder={placeholder}
                className={`outline-none
                    bg-${bgColor}
                    px-2 py-1 rounded-md
                    text-base 
                    ${className}`}
            />
        );
    }
);

export default FormInput;
