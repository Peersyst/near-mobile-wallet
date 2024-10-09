import { useModalState } from "module/common/hook/useModalState";
import useTranslate from "module/common/hook/useTranslate";
import { parseSignerDeepLinkData } from "module/signer/utils/parseSignerDeepLinkData";
import useSignerModal from "module/signer/hooks/useSignerModal";
import { useToast } from "@peersyst/react-native-components";

export interface UseScanQuickActionReturn {
    handleScan: (data: string) => void;
    scanOpened: boolean;
    showScanModal: () => void;
    hideScanModal: () => void;
}

export function useScanQuickAction(): UseScanQuickActionReturn {
    const translateError = useTranslate("error");
    const { showSignerModal } = useSignerModal();
    const { showToast } = useToast();
    const { open: scanOpened, showModal: showScanModal, hideModal: hideScanModal } = useModalState();

    const handleScan = (data: string) => {
        hideScanModal();
        const signerData = parseSignerDeepLinkData(data);
        if (!signerData) showToast(translateError("invalidSignerRequest"), { type: "error" });
        else showSignerModal(signerData!.type, signerData!.id);
    };

    return {
        handleScan,
        scanOpened,
        showScanModal,
        hideScanModal,
    };
}
