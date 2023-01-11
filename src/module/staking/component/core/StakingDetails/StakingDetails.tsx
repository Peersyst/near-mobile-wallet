import StakingDetail, { StakingDetailProps } from "module/staking/component/core/StakingDetail/StakingDetail";
import { StakingDetailsRoot } from "module/staking/component/core/StakingDetails/StakingDetails.styles";
import useGetTotalStaking from "module/staking/query/useGetTotalStaking";
import useWalletState from "module/wallet/hook/useWalletState";
import { useTranslate } from "module/common/hook/useTranslate";
import { Col, Spinner, Suspense } from "@peersyst/react-native-components";

type StakingDetailsSection = Omit<StakingDetailProps, "loading">;

const StakingDetails = (): JSX.Element => {
    const translate = useTranslate();

    const {
        state: { selectedWallet },
    } = useWalletState();
    const { isLoading, data: { staked, rewardsEarned, pending, available } = { staked: 0, pending: 0, available: 0 } } =
        useGetTotalStaking(selectedWallet);

    const stakingDetailsSections: StakingDetailsSection[] = [
        {
            title: translate("totalAmountStaked"),
            amount: staked,
            stakeable: true,
        },
        {
            title: translate("rewardsEarned"),
            amount: rewardsEarned,
        },
        {
            title: translate("pendingRelease"),
            amount: pending,
        },
        {
            title: translate("availableForWithdrawal"),
            amount: available,
        },
    ];

    return (
        <StakingDetailsRoot>
            <Suspense isLoading={isLoading} fallback={<Spinner />}>
                <Col flex={1}>
                    {stakingDetailsSections.map(
                        ({ title, amount, stakeable }, index) =>
                            amount !== undefined && <StakingDetail key={index} title={title} amount={amount} stakeable={stakeable} />,
                    )}
                </Col>
            </Suspense>
        </StakingDetailsRoot>
    );
};

export default StakingDetails;
