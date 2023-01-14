import useWalletState from "module/wallet/hook/useWalletState";
import useGetTotalStaking from "module/staking/query/useGetTotalStaking";
import { StakingDetailProps } from "module/staking/component/core/StakingDetail/StakingDetail";
import { useTranslate } from "module/common/hook/useTranslate";

interface UseGetStakingDetailsSectionReturn {
    isLoading: boolean;
    sections: StakingDetailsSection[];
}

type StakingDetailsSection = Omit<StakingDetailProps, "loading">;

export default function (): UseGetStakingDetailsSectionReturn {
    const translate = useTranslate();
    const {
        state: { selectedWallet },
    } = useWalletState();
    const { isLoading, data: { staked, rewardsEarned, pending, available } = { staked: 0, pending: 0, available: 0, rewardsEarned: 0 } } =
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

    return { isLoading, sections: stakingDetailsSections };
}
