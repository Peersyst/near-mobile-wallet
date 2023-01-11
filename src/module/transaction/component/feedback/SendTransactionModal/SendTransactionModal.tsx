import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import { BaseUseModalWrapperReturn } from "module/common/hook/useModalWrapper";
import { useTranslate } from "module/common/hook/useTranslate";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { useState } from "react";
import { UseMutationResult } from "react-query";

export type SendTransactionModalChildrenProps<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = Pick<
    BaseUseModalWrapperReturn,
    "showModal"
> &
    Pick<UseMutationResult<TData, TError, TVariables, TContext>, "isLoading" | "isError" | "isSuccess">;

export interface SendTransactionModalProps<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
    useMutationResult: Omit<UseMutationResult<TData, TError, TVariables, TContext>, "mutateAsync">;
    onExited?: () => unknown;
    sendTransaction: () => void | Promise<unknown>;
    children: (props: SendTransactionModalChildrenProps) => JSX.Element;
}

function SendTransactionModal<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>({
    useMutationResult,
    onExited,
    children,
    sendTransaction,
}: SendTransactionModalProps<TData, TError, TVariables, TContext>) {
    const translate = useTranslate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { isLoading, isSuccess, isError } = useMutationResult;

    return (
        <>
            {children({ showModal: () => setShowConfirmation(true), isError, isSuccess, isLoading: isLoading || showConfirmation })}
            <ConfirmPinModal open={showConfirmation} onClose={() => setShowConfirmation(false)} onPinConfirmed={sendTransaction} />
            <LoadingModal
                loading={isLoading}
                success={isSuccess}
                error={isError}
                onExited={onExited}
                successMessage={translate("transaction_completed")}
            />
        </>
    );
}

export default SendTransactionModal;
