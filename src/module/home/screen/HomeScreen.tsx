import { Col, PressableText, useToast } from "react-native-components";
import HomeSlider from "module/home/component/core/HomeSlider";
import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";
import HomeTabs from "../component/navigation/HomeTabs";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";
import useWalletState from "module/wallet/hook/useWalletState";
import { useEffect } from "react";
import { translate } from "locale";

const HomeScreen = (): JSX.Element => {
    const {
        state: { selectedWallet = 0, wallets },
    } = useWalletState();

    const { showToast, hideToast } = useToast();

    useEffect(() => {
        showToast(translate("testnet_warning"), {
            type: "warning",
            action: (
                <PressableText variant="body1" fontWeight="bold" onPress={hideToast}>
                    {translate("dismiss")}
                </PressableText>
            ),
            duration: Infinity,
        });
    }, []);

    return (
        <BaseWithBackgroundMainScreen>
            <Col flex={1} gap={20} style={{ paddingTop: 10 }}>
                <HomeSlider />
                {selectedWallet < wallets.length ? <HomeTabs /> : <AddWallet />}
            </Col>
        </BaseWithBackgroundMainScreen>
    );
};

export default HomeScreen;
