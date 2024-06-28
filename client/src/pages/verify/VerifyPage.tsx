import MainPage from "../../components/MainPage";
import { IoMdSad } from "react-icons/io";
import { IoMdHappy } from "react-icons/io";
import Loader from "../../components/Loader";
import useVerification from "../../hooks/auth/useVerification";

const VerifyPage = () => {
    const { isVerified, isLoading, message } = useVerification();

    return (
        <MainPage
            hasNavbar={true}
            authRequired={false}
            noAuthRequired={true}
            className="items-center"
        >
            {isLoading ? (
                <Loader className="text-5xl mt-40" />
            ) : (
                <>
                    {isVerified ? (
                        <IoMdHappy className="text-[100px] mt-40" />
                    ) : (
                        <IoMdSad className="text-[100px] mt-40" />
                    )}
                    <p className="text-sm sm:text-lg text-center text-wrap p-1">
                        {message}
                    </p>
                </>
            )}
        </MainPage>
    );
};

export default VerifyPage;
