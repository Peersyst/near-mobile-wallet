import { translate } from "locale";
import { MainTabItemType } from "../../../main/component/navigation/MainTabs/MainTabs.types";
import MainTabs from "../../../main/component/navigation/MainTabs/MainTabs";
import { Typography } from "react-native-components";
import DaoTransactionsList from "module/dao/component/core/DaoTransactionsList/DaoTransactionList";

const DaoTabs = (): JSX.Element => {
    const DaoTabs: MainTabItemType[] = [
        {
            title: translate("deposits"),
            item: <DaoTransactionsList />,
        },
        {
            title: translate("completed"),
            item: <Typography variant="body1">DaoTab2</Typography>,
        },
    ];
    return <MainTabs tabs={DaoTabs} />;
};

export default DaoTabs;
