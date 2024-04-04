import SupportCard from "../component/feedback/SupportCard/SupportCard";
import FAQs from "../component/display/FAQs/FAQs";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";

const FaqsScreen = (): JSX.Element => {
    return (
        <BaseSecondaryScreen>
            <SupportCard />
            <FAQs />
        </BaseSecondaryScreen>
    );
};

export default FaqsScreen;
