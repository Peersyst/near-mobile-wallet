import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Row, useConfig, useModal } from "@peersyst/react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import BuyModal from "module/transaction/component/core/BuyModal/BuyModal";
import { WalletCardButton } from "./WalletCardButtons.styles";

const WalletCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();
    const enableBuy = useConfig("enableBuy");

    return (
        <Row gap={8}>
            <WalletCardButton enableBuy={enableBuy} onPress={() => showModal(SendModal)}>
                {capitalize(translate("send"))}
            </WalletCardButton>
            <WalletCardButton enableBuy={enableBuy} onPress={() => showModal(ReceiveModal)}>
                {capitalize(translate("receive"))}
            </WalletCardButton>
            {enableBuy && (
                <WalletCardButton enableBuy={enableBuy} onPress={() => showModal(BuyModal)}>
                    {capitalize(translate("receive"))}
                </WalletCardButton>
            )}
        </Row>
    );
};

export default WalletCardButtons;
