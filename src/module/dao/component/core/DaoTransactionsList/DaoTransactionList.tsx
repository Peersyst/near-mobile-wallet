import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import { isDAOTransaction } from "module/transaction/component/utils/isDAOTransaction";
import { isDAODeposit } from "../../utils/isDAODeposit";

const DaoTransactionsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetTransactions();
    //Get the tx that corresponds to dao and filter the deposits
    //Then order them by the latest date 
    const filteredDAODepositsTxs = data.filter((tx) => isDAOTransaction(tx.type) && isDAODeposit(tx.type)).reverse();
    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={filteredDAODepositsTxs}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_deposits")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default DaoTransactionsList;
