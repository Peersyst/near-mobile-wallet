import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import { isUnlockDAO } from "../../utils/isUnlockDAO";
import { useMemo } from "react";

const DAOCompletedWithdrawalsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetTransactions();
    const filteredDAOWithdrawalTxs = useMemo(() => data.filter((tx) => isUnlockDAO(tx.type)), [data]);
    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={filteredDAOWithdrawalTxs}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_withdrawals")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default DAOCompletedWithdrawalsList;
