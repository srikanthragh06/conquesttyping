import { ReactNode } from "react";

const FormMessage = ({ children }: { children?: ReactNode }) => {
    return <p className="text-green-600 text-base">{children}</p>;
};

export default FormMessage;
