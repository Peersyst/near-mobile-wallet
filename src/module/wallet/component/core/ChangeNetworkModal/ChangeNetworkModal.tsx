import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import useChangeNetworkModal from "./hook/useChangeNetworkModal";
import { ChangeNetworkModalProps } from "./ChangeNetworkModal.types";
import { useTranslate } from "module/common/hook/useTranslate";

function ChangeNetworkModal({ children }: ChangeNetworkModalProps) {
    const { success, isLoading, ...childrenProps } = useChangeNetworkModal();
    const translate = useTranslate();
    return (
        <>
            {children(childrenProps)}
            <LoadingModal
                processingMessage={translate("recovering_accounts")}
                loading={isLoading}
                success={success}
                error={false}
                successMessage={translate("network_changed")}
            />
        </>
    );
}

export default ChangeNetworkModal;
