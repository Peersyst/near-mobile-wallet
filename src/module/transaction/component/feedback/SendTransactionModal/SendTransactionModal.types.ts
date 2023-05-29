import { UseModalStateReturn } from "module/common/hook/useModalState";

export type SendTransactionModalChildrenProps = Pick<UseModalStateReturn, "showModal"> & TransactionStatus;

export interface TransactionStatus {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}

export interface SendTransactionModalProps extends TransactionStatus {
    onExited?: () => unknown;
    sendTransaction: () => void | Promise<unknown>;
    children: (props: SendTransactionModalChildrenProps) => JSX.Element;
    txHash?: string;
}
