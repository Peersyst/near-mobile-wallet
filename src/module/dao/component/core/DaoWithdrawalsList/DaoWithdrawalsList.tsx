import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import { isDAOTransaction } from "module/transaction/component/utils/isDAOTransaction";
import { isDAOWithdraw } from "../../utils/isDAOWithdraw";

const DaoWithdrawalTransactionsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetTransactions();
    const filteredDAOTx = data.filter((tx) => isDAOTransaction(tx.type));
    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={filteredDAOTx.filter((tx)=> isDAOWithdraw(tx.type))}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default DaoWithdrawalTransactionsList;