import StakingDetail from "module/staking/component/core/StakingDetail/StakingDetail";
import { StakingDetailsRoot } from "module/staking/component/core/StakingDetails/StakingDetails.styles";
import { Col, Skeleton } from "@peersyst/react-native-components";
import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";

const StakingDetails = (): JSX.Element => {
    const { isLoading, sections } = useGetStakingDetailsSections();

    return (
        <StakingDetailsRoot>
            <Col flex={1}>
                {sections.map(({ title, amount = 0, stakeable }, index) => (
                    <Skeleton key={index} loading={isLoading}>
                        <StakingDetail title={title} amount={amount} stakeable={stakeable} />
                    </Skeleton>
                ))}
            </Col>
        </StakingDetailsRoot>
    );
};

export default StakingDetails;
