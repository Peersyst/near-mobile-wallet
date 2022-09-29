import useGetTransactions from "module/transaction/query/useGetTransactions";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import isCKBTransaction from "module/transaction/component/utils/isCKBTransaction";
import { TransactionStatus, TransactionType } from "ckb-peersyst-sdk";

const TransactionsList = (): JSX.Element => {
    const { data = [], isLoading } = useGetTransactions({ filter: (tx) => isCKBTransaction(tx.type) });

    return (
        <MainList
            loading={isLoading}
            data={[
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.RECEIVE_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.RECEIVE_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.RECEIVE_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.RECEIVE_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
                {
                    status: TransactionStatus.COMMITTED,
                    type: TransactionType.SEND_NATIVE_TOKEN,
                    amount: 100,
                    transactionHash: "0x1234567890abcdef",
                    inputs: [],
                    outputs: [],
                    blockHash: "0x1234567890abcdef",
                    blockNumber: 1,
                    timestamp: new Date(2022, 0, 29),
                },
            ]}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TransactionsList;
