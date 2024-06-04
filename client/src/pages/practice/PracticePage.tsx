import MainPage from "../../components/MainPage";
import PracticeBoard from "./PracticeBoard";

const PracticePage = () => {
    return (
        <MainPage hasNavbar={true} className="items-center">
            <PracticeBoard />
        </MainPage>
    );
};

export default PracticePage;
