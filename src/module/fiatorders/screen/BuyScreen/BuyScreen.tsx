import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import OnRampView from "module/transak/component/OnRampView/OnRampView";

const BuyScreen = (): JSX.Element => {
    return (
        <BaseMainScreen title={"Comprar NEAR"} back>
            <OnRampView />
        </BaseMainScreen>
    );
};

export default BuyScreen;
