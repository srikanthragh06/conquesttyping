import MainPage from "../../components/MainPage";

const NotFoundPage = () => {
    return (
        <MainPage
            hasNavbar={false}
            authRequired={false}
            noAuthRequired={false}
            className="flex flex-col items-center justify-center
                        text-4xl"
        >
            Page Not Found
        </MainPage>
    );
};

export default NotFoundPage;
