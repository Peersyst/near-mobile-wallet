import StakingDetail from "module/staking/component/core/StakingDetail/StakingDetail";
import { StakingDetailsRoot } from "module/staking/component/core/StakingDetails/StakingDetails.styles";
import { Col, List } from "@peersyst/react-native-components";
import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";

const StakingDetails = (): JSX.Element => {
    const { isLoading, sections } = useGetStakingDetailsSections();

    return (
        <StakingDetailsRoot>
            <Col flex={1}>
                <List
                    data={sections}
                    renderItem={({ item: { title, amount, stakeable } }) => (
                        <StakingDetail key={title} title={title} amount={amount} stakeable={stakeable} loading={isLoading} />
                    )}
                />
            </Col>
        </StakingDetailsRoot>
    );
};

export default StakingDetails;
