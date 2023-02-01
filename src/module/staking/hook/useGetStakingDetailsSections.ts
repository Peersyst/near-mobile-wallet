import useWalletState from "module/wallet/hook/useWalletState";
import useGetTotalStaking from "module/staking/query/useGetTotalStaking";
import { useTranslate } from "module/common/hook/useTranslate";
import { StakingDetailCardProps } from "../component/display/StakingDetailCard/StakingDetailCard";
import UnstakeModal from "module/staking/component/core/UnstakeModal/UnstakeModal";
import { useModal } from "@peersyst/react-native-components";
import WithdrawModal from "module/staking/component/core/WithdrawModal/WithdrawModal";
import { BalanceOperations } from "near-peersyst-sdk";

interface UseGetStakingDetailsSectionReturn {
    isLoading: boolean;
    refetch: () => void;
    sections: StakingDetailsSection[];
}

export type StakingDetailsSection = Omit<StakingDetailCardProps, "loading">;

export default function (): UseGetStakingDetailsSectionReturn {
    const translate = useTranslate();
    const { showModal } = useModal();
    const {
        state: { selectedWallet },
    } = useWalletState();
    const {
        isLoading,
        data: { staked, rewardsEarned, pending, available } = { staked: "0", pending: "0", available: "0", rewardsEarned: "0" },
        refetch,
    } = useGetTotalStaking(selectedWallet);

    const stakingDetailsSections: StakingDetailsSection[] = [
        {
            title: translate("totalAmountStaked"),
            amount: staked,
            enabled: BalanceOperations.BNIsBigger(staked, "0"),
            action: "unstake",
            onAction: () => showModal(UnstakeModal),
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
            enabled: BalanceOperations.BNIsBigger(available, "0"),
            action: "withdraw",
            onAction: () => showModal(WithdrawModal),
        },
    ];

    return { isLoading, refetch, sections: stakingDetailsSections };
}
