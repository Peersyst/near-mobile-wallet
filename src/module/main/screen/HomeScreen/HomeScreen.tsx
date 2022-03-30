import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { Col } from "react-native-components";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import MainSlider from "module/main/component/core/MainSlider";
import { CardBackgroundHome } from "./HomeScreen.styles";
import useWalletState from "module/wallet/hook/useWalletState";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";

const HomeScreen = (): JSX.Element => {
    const {
        state: { selectedWallet = 0, wallets },
    } = useWalletState();

    return (
        <BaseMainScreen>
            <CardBackgroundHome />
            <Col flex={1} gap={20} style={{ paddingTop: 10 }}>
                <MainSlider />
                {selectedWallet < wallets.length ? <MainTabs /> : <AddWallet />}
            </Col>
        </BaseMainScreen>
    );
};

export default HomeScreen;
