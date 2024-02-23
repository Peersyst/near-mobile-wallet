import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import { Col } from "@peersyst/react-native-components";
import { ReactElement } from "react";
import { MainContentCard } from "./MainGradientScreen.styles";
import useWalletState from "module/wallet/hook/useWalletState";
import AddWallet from "module/wallet/component/core/AddWallet/AddWallet";

interface MainGradientScreenProps {
    children: { slider: ReactElement; content: ReactElement };
}

const MainGradientScreen = ({ children: { slider, content } }: MainGradientScreenProps): JSX.Element => {
    const {
        state: { loading, selectedWallet = 0, wallets },
    } = useWalletState();
    return (
        <BaseMainGradientScreen>
            <Col flex={1}>
                {slider}
                <MainContentCard>{loading || selectedWallet < wallets.length ? content : <AddWallet />}</MainContentCard>
            </Col>
        </BaseMainGradientScreen>
    );
};

export default MainGradientScreen;
