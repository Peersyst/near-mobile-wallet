import { BaseUseModalWrapperReturn } from "module/common/hook/useModalWrapper";
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
