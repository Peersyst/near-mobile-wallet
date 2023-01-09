import { Col } from "@peersyst/react-native-components";
import HomeSlider from "module/home/component/core/HomeSlider/HomeSlider";
import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import HomeTabs from "../component/navigation/HomeTabs";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";
import useWalletState from "module/wallet/hook/useWalletState";
import { MainHomeCard } from "./HomeScreen.styles";

const HomeScreen = (): JSX.Element => {
    const {
        state: { selectedWallet = 0, wallets },
    } = useWalletState();

    return (
        <BaseMainGradientScreen>
            <Col flex={1}>
                <HomeSlider />
                <MainHomeCard>{selectedWallet < wallets.length ? <HomeTabs /> : <AddWallet />}</MainHomeCard>
            </Col>
        </BaseMainGradientScreen>
    );
};

export default HomeScreen;
