import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Row, useConfig, useModal } from "@peersyst/react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import useIsMainnet from "module/settings/hook/useIsMainnet";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { Linking } from "react-native";
import { ArrowReceiveIcon, ArrowSendIcon, BuyIcon, SwapIcon } from "icons";
import LabeledIconButton from "module/common/component/input/LabeledIconButton/LabeledIconButton";
import useGetSwapLink from "module/common/hook/useGetSwapLink";

const WalletCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();
    const navigate = useNavigation();
    const enableBuy = useConfig("enableBuy");
    const isMainnet = useIsMainnet();
    const showBuyButton = enableBuy && isMainnet;
    const uriSwap = useGetSwapLink();
    return (
        <Row gap={4}>
            {showBuyButton && (
                <LabeledIconButton
                    variant="glass"
                    label={capitalize(translate("buy"))}
                    onPress={() => navigate.navigate(MainScreens.FIAT_ORDERS)}
                >
                    <BuyIcon />
                </LabeledIconButton>
            )}
            <LabeledIconButton variant="secondary" label={capitalize(translate("send"))} onPress={() => showModal(SendModal)}>
                <ArrowSendIcon />
            </LabeledIconButton>
            <LabeledIconButton variant="secondary" label={capitalize(translate("receive"))} onPress={() => showModal(ReceiveModal)}>
                <ArrowReceiveIcon />
            </LabeledIconButton>
            <LabeledIconButton variant="glass" label={capitalize(translate("swap"))} onPress={() => Linking.openURL(uriSwap)}>
                <SwapIcon />
            </LabeledIconButton>
        </Row>
    );
};

export default WalletCardButtons;
