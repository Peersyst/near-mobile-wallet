import useUncommittedTransactions from "module/transaction/query/useUncommittedTransactions";

export default function (): boolean {
    const { data } = useUncommittedTransactions();
    return !!data?.length;
}
