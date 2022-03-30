import { translate } from "locale";
import { MainTabItemType } from "../../../main/component/navigation/MainTabs/MainTabs.types";
import MainTabs from "../../../main/component/navigation/MainTabs/MainTabs";
import { Typography } from "react-native-components";

const DaoTabs = (): JSX.Element => {
    const DaoTabs: MainTabItemType[] = [
        {
            title: translate("deposits"),
            item: <Typography variant="body1">Deposits</Typography>,
        },
        {
            title: translate("completed"),
            item: <Typography variant="body1">Completed</Typography>,
        }
    ];
    return <MainTabs tabs={DaoTabs} />;
};

export default DaoTabs;

