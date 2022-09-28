import { Col } from "@peersyst/react-native-components";
import HomeSlider from "module/home/component/core/HomeSlider";
import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";
import HomeTabs from "../component/navigation/HomeTabs";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";
import useWalletState from "module/wallet/hook/useWalletState";

const HomeScreen = (): JSX.Element => {
    const {
        state: { selectedWallet = 0, wallets },
    } = useWalletState();

    return (
        <BaseWithBackgroundMainScreen>
            <Col flex={1}>
                <HomeSlider />
                {selectedWallet < wallets.length ? <HomeTabs /> : <AddWallet />}
            </Col>
        </BaseWithBackgroundMainScreen>
    );
};

export default HomeScreen;
