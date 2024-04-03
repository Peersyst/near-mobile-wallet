import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import SupportCard from "../component/feedback/SupportCard/SupportCard";
import { BaseMainVariant } from "module/main/component/layout/BaseMainScreen/BaseMainScreen.stypes";
import FAQs from "../component/display/FAQs/FAQs";
import { ScrollView } from "@peersyst/react-native-components";

const FaqsScreen = (): JSX.Element => {
    return (
        <BaseMainScreen variant={BaseMainVariant.GRAY}>
            <ScrollView>
                <>
                    <SupportCard />
                    <FAQs />
                </>
            </ScrollView>
        </BaseMainScreen>
    );
};

export default FaqsScreen;
