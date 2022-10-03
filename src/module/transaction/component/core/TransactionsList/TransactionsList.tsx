import useGetTransactions from "module/transaction/query/useGetTransactions";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import isCKBTransaction from "module/transaction/component/utils/isCKBTransaction";
import { TransactionStatus, TransactionType } from "ckb-peersyst-sdk";

const TransactionsList = (): JSX.Element => {
    const { data = [], isLoading } = useGetTransactions({ filter: (tx) => isCKBTransaction(tx.type) });

    const txs2 = [...Array(10).keys()].map((i) => ({
        status: TransactionStatus.COMMITTED,
        type: TransactionType.SEND_NATIVE_TOKEN,
        amount: 100,
        transactionHash: "0x1234567890abcdef",
        inputs: [],
        outputs: [
            {
                quantity: 10250,
                address: "ckb1qqypm0l63rdt2jayymfrrjnyadmqe630a8skwcdpmfqqmgdje0sjsqfyxx8e4nfdhtjf2eynl0wnx5zprz6s77gmudv2e",
            },
        ],
        blockHash: "0x1234567890abcdef",
        blockNumber: 1,
        timestamp: new Date(2022, 0, 29),
    }));
    return (
        <MainList
            loading={isLoading}
            data={txs2}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TransactionsList;
