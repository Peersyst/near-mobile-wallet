import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import SupportCard from "../component/feedback/SupportCard/SupportCard";
import { BaseMainVariant } from "module/main/component/layout/BaseMainScreen/BaseMainScreen.stypes";
import FAQs from "../component/display/FAQs/FAQs";

const FaqsScreen = (): JSX.Element => {
    return (
        <BaseMainScreen variant={BaseMainVariant.GRAY}>
            <SupportCard />
            <FAQs />
        </BaseMainScreen>
    );
};

export default FaqsScreen;
