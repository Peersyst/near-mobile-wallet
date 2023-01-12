import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import { useTranslate } from "module/common/hook/useTranslate";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { useState } from "react";
import { InteractionManager } from "react-native";
import { SendTransactionModalProps } from "./SendTransactionModal.types";

function SendTransactionModal({ useMutationStatusResult, onExited, children, sendTransaction }: SendTransactionModalProps) {
    const translate = useTranslate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { isLoading, isSuccess, isError } = useMutationStatusResult;

    function runAfterInteractions(cb?: () => void) {
        if (cb) {
            InteractionManager.runAfterInteractions(() => {
                cb();
            });
        }
    }

    const handleOnPinConfirmed = () => runAfterInteractions(sendTransaction);

    const handleOnExited = () => runAfterInteractions(onExited);

    return (
        <>
            {children({ showModal: () => setShowConfirmation(true), isError, isSuccess, isLoading: isLoading || showConfirmation })}
            <ConfirmPinModal open={showConfirmation} onClose={() => setShowConfirmation(false)} onPinConfirmed={handleOnPinConfirmed} />
            <LoadingModal
                loading={isLoading}
                success={isSuccess}
                error={isError}
                onExited={handleOnExited}
                successMessage={translate("transaction_completed")}
            />
        </>
    );
}

export default SendTransactionModal;
