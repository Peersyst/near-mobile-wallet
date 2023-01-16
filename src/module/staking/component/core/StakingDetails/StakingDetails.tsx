import StakingDetail from "module/staking/component/core/StakingDetail/StakingDetail";
import { StakingDetailsRoot } from "module/staking/component/core/StakingDetails/StakingDetails.styles";
import { Col, List } from "@peersyst/react-native-components";
import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";
import MainList from "module/main/component/display/MainList/MainList";

const StakingDetails = (): JSX.Element => {
    const { sections, isLoading } = useGetStakingDetailsSections();

    return (
        <MainList
            loading={isLoading}
            data={sections}
            renderItem={({ item: { title, amount, stakeable } }) => (
                <StakingDetail key={title} title={title} amount={amount} stakeable={stakeable} />
            )}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default StakingDetails;
