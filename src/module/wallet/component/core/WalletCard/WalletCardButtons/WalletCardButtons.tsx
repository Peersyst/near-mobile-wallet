import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Row, useConfig, useModal } from "@peersyst/react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import { WalletCardButton } from "./WalletCardButtons.styles";
import useIsMainnet from "module/settings/hook/useIsMainnet";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";

const WalletCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();
    const navigate = useNavigation();
    const enableBuy = useConfig("enableBuy");
    const isMainnet = useIsMainnet();
    const showBuyButton = enableBuy && isMainnet;

    return (
        <Row gap={8}>
            <WalletCardButton enableBuy={showBuyButton} onPress={() => showModal(SendModal)}>
                {capitalize(translate("send"))}
            </WalletCardButton>
            <WalletCardButton enableBuy={showBuyButton} onPress={() => showModal(ReceiveModal)}>
                {capitalize(translate("receive"))}
            </WalletCardButton>
            {showBuyButton && (
                <WalletCardButton enableBuy={showBuyButton} onPress={() => navigate.navigate(MainScreens.FIAT_ORDERS)}>
                    {capitalize(translate("buy"))}
                </WalletCardButton>
            )}
        </Row>
    );
};

export default WalletCardButtons;
