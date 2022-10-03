import { Col } from "@peersyst/react-native-components";
import HomeSlider from "module/home/component/core/HomeSlider";
import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import HomeTabs from "../component/navigation/HomeTabs";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";
import useWalletState from "module/wallet/hook/useWalletState";

const HomeScreen = (): JSX.Element => {
    const {
        state: { selectedWallet = 0, wallets },
    } = useWalletState();

    return (
        <BaseMainGradientScreen style={{ backgroundColor: "#5F8AFA", secondaryBackgroundColor: "#4FD1D9" }}>
            <Col flex={1}>
                <HomeSlider />
                {selectedWallet < wallets.length ? <HomeTabs /> : <AddWallet />}
            </Col>
        </BaseMainGradientScreen>
    );
};

export default HomeScreen;
