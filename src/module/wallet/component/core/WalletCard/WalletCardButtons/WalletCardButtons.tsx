import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Row, useModal } from "@peersyst/react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { ArrowReceiveIcon, ArrowSendIcon, BuyIcon, SwapIcon } from "icons";
import LabeledIconButton from "module/common/component/input/LabeledIconButton/LabeledIconButton";
import useGetSwapLink from "module/common/hook/useGetSwapLink";
import useIsBuyEnabled from "module/wallet/hook/useIsBuyEnabled";
import { DAppWebViewModal } from "module/signer/containers/DAppWebViewModal/DAppWebViewModal";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";
import { Linking, Platform } from "react-native";

const WalletCardButtons = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigation();
    const showBuyButton = useIsBuyEnabled();
    const uriSwap = useGetSwapLink();
    const { showModal, hideModal } = useModal();

    function handleSwapPress(): void {
        isAndroid
            ? Linking.openURL(uriSwap)
            : showModal(DAppWebViewModal, {
                  url: uriSwap,
                  name: capitalize(translate("swap")),
                  onClose: () => hideModal(DAppWebViewModal.id),
              });
    }
    const isAndroid = Platform.OS === "android";
    return (
        <DarkThemeProvider>
            <Row gap={6}>
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

                <LabeledIconButton variant="glass" label={capitalize(translate("swap"))} onPress={handleSwapPress}>
                    <SwapIcon />
                </LabeledIconButton>
            </Row>
        </DarkThemeProvider>
    );
};

export default WalletCardButtons;
