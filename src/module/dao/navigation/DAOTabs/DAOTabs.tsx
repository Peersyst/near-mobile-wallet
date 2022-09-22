import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import MainTabs from "../../../main/component/navigation/MainTabs/MainTabs";
import DAOCompletedWithdrawalsList from "module/dao/component/core/DAOCompletedWithdrawalsList/DAOCompletedWithdrawalsList";
import DAODepositsList from "module/dao/component/core/DAODepositsList/DAODepositsList";
import { useTranslate } from "module/common/hook/useTranslate";

const DAOTabs = (): JSX.Element => {
    const translate = useTranslate();
    const DAOTabs: MainTabItemType[] = [
        {
            title: translate("deposits"),
            item: <DAODepositsList />,
        },
        {
            title: translate("withdrawals"),
            item: <DAOCompletedWithdrawalsList />,
        },
    ];
    return <MainTabs tabs={DAOTabs} />;
};

export default DAOTabs;
