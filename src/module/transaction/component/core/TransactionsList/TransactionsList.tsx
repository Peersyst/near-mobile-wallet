import useGetTransactions from "module/transaction/query/useGetTransactions";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import isCKBTransaction from "module/transaction/component/utils/isCKBTransaction";
import { TransactionStatus, TransactionType } from "ckb-peersyst-sdk";

const TransactionsList = (): JSX.Element => {
    const { data = [], isLoading } = useGetTransactions({ filter: (tx) => isCKBTransaction(tx.type) });
    const txs = [...Array(29)].map((_, i) => ({
        id: i.toString(),
        timestamp: "Thu Sep 29 2022 17:32:43 GMT+0200 (Central European Summer Time)",
        status: TransactionStatus.COMMITTED,
        type: i % 3 === 0 ? TransactionType.SEND_NATIVE_TOKEN : TransactionType.RECEIVE_NATIVE_TOKEN,
        amount: 100,
        transactionHash: "0x1234567890abcdef",
        inputs: [],
        outputs: [],
        blockHash: "0x1234567890abcdef",
        blockNumber: 1,
    }));
    return (
        <MainList
            loading={isLoading}
            data={txs}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            renderItem={({ item: tx, index }) => <TransactionCard transaction={tx} last={index === txs.length - 1} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TransactionsList;
