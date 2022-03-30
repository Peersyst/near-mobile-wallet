import { translate } from "locale";
import { MainTabItemType } from "../../../main/component/navigation/MainTabs/MainTabs.types";
import MainTabs from "../../../main/component/navigation/MainTabs/MainTabs";
import { Typography } from "react-native-components";
import TransactionsList from "module/transaction/component/core/TransactionsList/TransactionsList";

const DaoTabs = (): JSX.Element => {
    const DaoTabs: MainTabItemType[] = [
        {
            title: translate("deposits"),
            item: <TransactionsList />,
        },
        {
            title: translate("completed"),
            item: <Typography variant="body1">DaoTab2</Typography>,
        },
    ];
    return <MainTabs tabs={DaoTabs} />;
};

export default DaoTabs;
