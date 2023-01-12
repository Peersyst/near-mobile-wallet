import { BaseUseModalWrapperReturn } from "module/common/hook/useModalWrapper";

export type SendTransactionModalChildrenProps = Pick<BaseUseModalWrapperReturn, "showModal"> & UseMutationStatusResult;

export interface UseMutationStatusResult {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}

export interface SendTransactionModalProps {
    useMutationStatusResult: UseMutationStatusResult;
    onExited?: () => unknown;
    sendTransaction: () => void | Promise<unknown>;
    children: (props: SendTransactionModalChildrenProps) => JSX.Element;
}
