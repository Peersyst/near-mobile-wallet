import { capitalize } from "@peersyst/react-utils";
import { ResourceKey } from "i18next";
import { ArrowSendIcon, ArrowReceiveIcon, SwapIcon, BuyIcon } from "icons";
import { useModalState } from "module/common/hook/useModalState";
import useNavigation from "module/common/hook/useNavigation";
import useTranslate from "module/common/hook/useTranslate";
import { QRCodeIcon } from "module/common/icons/QRCodeIcon";
import { QuickAction } from "module/home/component/feedback/QuickActionsModal.types";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Fragment } from "react";

export function useQuickActionsBottomBarItem() {
    const { open, showModal, hideModal } = useModalState();
    const { open: scanOpened, showModal: showScanModal, hideModal: hideScanModal } = useModalState();
    const { open: sendOpened, showModal: showSendModal, hideModal: hideSendModal } = useModalState();
    const { open: receiveOpened, showModal: showReceiveModal, hideModal: hideReceiveModal } = useModalState();
    const navigate = useNavigation();

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
            onPress: () => console.log("Scan"),
            variant: "soft",
        },
        {
            Icon: BuyIcon,
            label: getCapitalizedTranslation("buy"),
            onPress: () => console.log("Scan"),
            variant: "soft",
        },
    ];

    return {
        actions,
        modals: (
            <Fragment>
                <SendModal open={sendOpened} onClose={hideSendModal} />
                <ReceiveModal open={receiveOpened} onClose={hideReceiveModal} />
            </Fragment>
        ),
        open,
        showModal,
        hideModal,
    };
}
