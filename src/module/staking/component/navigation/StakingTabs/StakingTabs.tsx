import { useTranslate } from "module/common/hook/useTranslate";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import StakingDetails from "module/staking/component/display/MyStakingList/MyStakingList";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import StakingCurrentValidators from "module/staking/component/display/MyCurrentValidatorsList/MyCurrentValidatorsList";

const StakingTabs = (): JSX.Element => {
    const translate = useTranslate();
    const StakingTabs: MainTabItemType[] = [
        {
            title: translate("summary"),
            item: <StakingDetails />,
        },
        {
            title: translate("your_current_validators"),
            item: <StakingCurrentValidators />,
        },
    ];

    return <MainTabs tabs={StakingTabs} />;
};

export default StakingTabs;
