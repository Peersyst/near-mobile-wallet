import HomeSlider from "module/home/component/core/HomeSlider/HomeSlider";
import HomeTabs from "../component/navigation/HomeTabs";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";
import useWalletState from "module/wallet/hook/useWalletState";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";

const HomeScreen = (): JSX.Element => {
    const {
        state: { selectedWallet = 0, wallets },
    } = useWalletState();

    return (
        <MainGradientScreen>
            {{
                slider: <HomeSlider />,
                content: selectedWallet < wallets.length ? <HomeTabs /> : <AddWallet />,
            }}
        </MainGradientScreen>
    );
};

export default HomeScreen;
