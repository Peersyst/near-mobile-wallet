import { capitalize } from "@peersyst/react-utils";
import { ResourceKey } from "i18next";
import { ArrowSendIcon, ArrowReceiveIcon, SwapIcon, BuyIcon } from "icons";
import { useModalState } from "module/common/hook/useModalState";
import useTranslate from "module/common/hook/useTranslate";
import { QRCodeIcon } from "module/common/icons/QRCodeIcon";
import { QuickAction } from "module/home/component/feedback/QuickActionsModal.types";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Fragment } from "react";
import QrScanner from "module/common/component/input/QrScanner/QrScanner";
import { useScanQuickAction } from "./useScanQuickAction";
import { useSwapQuickAction } from "./useSwapQuickAction";
import { useBuyQuickAction } from "./useBuyQuickAction";
import { useConfig } from "@peersyst/react-native-components";

export interface UseQuickActionsBottomBarItemReturn {
    actions: QuickAction[];
    modals: JSX.Element;
    open: boolean;
    showModal: () => void;
    hideModal: () => void;
}

export function useQuickActionsBottomBarItem(): UseQuickActionsBottomBarItemReturn {
    const { open, showModal, hideModal } = useModalState();
    const translate = useTranslate();
    const signerFeatureConfig = useConfig("signerFeature");
    const { handleSwapPress } = useSwapQuickAction();
    const { handleBuyPress } = useBuyQuickAction();
    const { scanOpened, showScanModal, handleScan, hideScanModal } = useScanQuickAction();
    const { open: sendOpened, showModal: showSendModal, hideModal: hideSendModal } = useModalState();
    const { open: receiveOpened, showModal: showReceiveModal, hideModal: hideReceiveModal } = useModalState();

    function getCapitalizedTranslation(key: ResourceKey): string {
        return capitalize(translate(key));
    }

    function withHandleOnPress(callback: () => void) {
        return () => {
            hideModal();
            callback();
        };
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
        ...(signerFeatureConfig.enabled
            ? [
                  {
                      Icon: SwapIcon,
                      label: getCapitalizedTranslation("swap"),
                      onPress: withHandleOnPress(handleSwapPress),
                      variant: "soft",
                  } as const,
              ]
            : []),
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
