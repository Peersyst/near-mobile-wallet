import { translate } from "locale";
import { MainTabItemType } from "../../../main/component/navigation/MainTabs/MainTabs.types";
import MainTabs from "../../../main/component/navigation/MainTabs/MainTabs";
import DaoCompletedWithdrawalsList from "module/dao/component/core/DaoCompletedWithdrawalsList/DaoCompletedWithdrawalsList";
import DaoDepositsList from "module/dao/component/core/DaoDepositsList/DaoDepositsList";

const DaoTabs = (): JSX.Element => {
    const DaoTabs: MainTabItemType[] = [
        {
            title: translate("deposits"),
            item: <DaoDepositsList />,
        },
        {
            title: translate("completed"),
            item: <DaoCompletedWithdrawalsList />,
        },
    ];
    return <MainTabs tabs={DaoTabs} />;
};

export default DaoTabs;
