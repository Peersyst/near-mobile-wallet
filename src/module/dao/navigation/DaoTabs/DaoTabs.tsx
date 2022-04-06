import { translate } from "locale";
import { MainTabItemType } from "../../../main/component/navigation/MainTabs/MainTabs.types";
import MainTabs from "../../../main/component/navigation/MainTabs/MainTabs";
import DaoTransactionsList from "module/dao/component/core/DaoTransactionsList/DaoTransactionList";
import DaoWithdrawalTransactionsList from "module/dao/component/core/DaoWithdrawalsList/DaoWithdrawalsList";

const DaoTabs = (): JSX.Element => {
    const DaoTabs: MainTabItemType[] = [
        {
            title: translate("deposits"),
            item: <DaoTransactionsList />,
        },
        {
            title: translate("completed"),
            item: <DaoWithdrawalTransactionsList />,
        },
    ];
    return <MainTabs tabs={DaoTabs} />;
};

export default DaoTabs;
