import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQuery } from "react-query";
import { StakingBalance } from "module/sdk";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import { config } from "config";
import { usePostHog } from "posthog-react-native";
import BigNumber from "bignumber.js";

export default function (index?: number): QueryResult<StakingBalance> {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    const posthog = usePostHog();

    return useQuery(
        [Queries.TOTAL_STAKING_BALANCE, usedIndex, network],
        async (): Promise<StakingBalance> => {
            const totalStakingBalance = await serviceInstance.getTotalStakingBalance();

            try {
                posthog?.capture("load_staking_info", {
                    wallet_address: serviceInstance.getAddress(),
                    total_amount_staked: BigNumber(totalStakingBalance.staked).toNumber(),
                    rewards_earned: totalStakingBalance.rewardsEarned ? BigNumber(totalStakingBalance.rewardsEarned).toNumber() : 0,
                    pending_release: BigNumber(totalStakingBalance.pending).toNumber(),
                    chain: network,
                });
            } catch (error) {}

            return totalStakingBalance;
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.stakingBalance,
        },
    );
}
