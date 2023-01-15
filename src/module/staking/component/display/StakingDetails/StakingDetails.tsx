import StakingDetail from "module/staking/component/core/StakingDetail/StakingDetail";
import { StakingDetailsRoot } from "module/staking/component/display/StakingDetails/StakingDetails.styles";
import { Col, Spinner, Suspense } from "@peersyst/react-native-components";
import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";

const StakingDetails = (): JSX.Element => {
    const { isLoading, sections } = useGetStakingDetailsSections();

    return (
        <StakingDetailsRoot>
            <Suspense isLoading={isLoading} fallback={<Spinner />}>
                <Col flex={1}>
                    {sections.map(
                        ({ title, amount, stakeable }, index) =>
                            amount !== undefined && <StakingDetail key={index} title={title} amount={amount} stakeable={stakeable} />,
                    )}
                </Col>
            </Suspense>
        </StakingDetailsRoot>
    );
};

export default StakingDetails;
