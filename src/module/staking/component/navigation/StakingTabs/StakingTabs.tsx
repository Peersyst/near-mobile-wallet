import { useTranslate } from "module/common/hook/useTranslate";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import StakingDetails from "module/staking/component/core/StakingDetails/StakingDetails";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";

const StakingTabs = (): JSX.Element => {
    const translate = useTranslate();
    const StakingTabs: MainTabItemType[] = [
        {
            title: translate("summary"),
            item: <StakingDetails />,
        },
    ];

    return <MainTabs tabs={StakingTabs} />;
};

export default StakingTabs;
