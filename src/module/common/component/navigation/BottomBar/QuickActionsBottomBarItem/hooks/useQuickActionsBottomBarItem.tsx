import { capitalize } from "@peersyst/react-utils";
import { ResourceKey } from "i18next";
import { ArrowSendIcon, ArrowReceiveIcon, SwapIcon, BuyIcon } from "icons";
import useGetSwapLink from "module/common/hook/useGetSwapLink";
import { useModalState } from "module/common/hook/useModalState";
import useNavigation from "module/common/hook/useNavigation";
import useTranslate from "module/common/hook/useTranslate";
import { QRCodeIcon } from "module/common/icons/QRCodeIcon";
import { QuickAction } from "module/home/component/feedback/QuickActionsModal.types";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Fragment } from "react";
import { MainScreens } from "../../../MainNavigatorGroup/MainScreens";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { parseSignerDeepLinkData } from "module/signer/utils/parseSignerDeepLinkData";
import useSignerModal from "module/signer/hooks/useSignerModal";
import { useToast } from "@peersyst/react-native-components";
import QrScanner from "module/common/component/input/QrScanner/QrScanner";

export function useQuickActionsBottomBarItem() {
    const { open, showModal, hideModal } = useModalState();
    const translateError = useTranslate("error");
    const { showSignerModal } = useSignerModal();
    const { showToast } = useToast();
    const { open: scanOpened, showModal: showScanModal, hideModal: hideScanModal } = useModalState();
    const { open: sendOpened, showModal: showSendModal, hideModal: hideSendModal } = useModalState();
    const { open: receiveOpened, showModal: showReceiveModal, hideModal: hideReceiveModal } = useModalState();
    const navigate = useNavigation();

    const uriSwap = useGetSwapLink();

    function handleSwapPress(): void {
        // (jordi): We need to cast the navigate.navigate to any because the React Navigation types are not working properly
        navigate.navigate(MainScreens.DAPPS, { screen: DAppScreens.WEBVIEW, params: { url: uriSwap } } as any);
    }

    const translate = useTranslate();

    function getCapitalizedTranslation(key: ResourceKey): string {
        return capitalize(translate(key));
    }

    function withHandleOnPress(callback: () => void) {
        return () => {
            hideModal();
            callback();
        };
    }

    const handleScan = (data: string) => {
        hideScanModal();
        const signerData = parseSignerDeepLinkData(data);
        if (!signerData) showToast(translateError("invalidSignerRequest"), { type: "error" });
        else showSignerModal(signerData!.type, signerData!.id);
    };

    function handleBuyPress() {
        navigate.navigate(MainScreens.FIAT_ORDERS);
    }

    const actions: QuickAction[] = [
        {
            Icon: QRCodeIcon,
            label: getCapitalizedTranslation("scanQR"),
            onPress: withHandleOnPress(showScanModal),
            variant: "primary",
        },
        {
            Icon: ArrowSendIcon,
            label: getCapitalizedTranslation("send"),
            onPress: withHandleOnPress(showSendModal),
            variant: "soft",
        },
        {
            Icon: ArrowReceiveIcon,
            label: getCapitalizedTranslation("receive"),
            onPress: withHandleOnPress(showReceiveModal),
            variant: "soft",
        },
        {
            Icon: SwapIcon,
            label: getCapitalizedTranslation("swap"),
            onPress: withHandleOnPress(handleSwapPress),
            variant: "soft",
        },
        {
            Icon: BuyIcon,
            label: getCapitalizedTranslation("buy"),
            onPress: withHandleOnPress(handleBuyPress),
            variant: "soft",
        },
    ];

    return {
        actions,
        modals: (
            <Fragment>
                <QrScanner open={scanOpened} onClose={hideScanModal} onScan={({ data }) => handleScan(data)} />
                <SendModal open={sendOpened} onClose={hideSendModal} />
                <ReceiveModal open={receiveOpened} onClose={hideReceiveModal} />
            </Fragment>
        ),
        open,
        showModal,
        hideModal,
    };
}
