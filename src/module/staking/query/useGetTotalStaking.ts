import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQuery } from "react-query";
import { StakingBalance } from "module/sdk";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import { config } from "config";

export default function (index?: number): QueryResult<StakingBalance> {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);

    return useQuery(
        [Queries.TOTAL_STAKING_BALANCE, usedIndex, network],
        async (): Promise<StakingBalance> => {
            const totalStakingBalance = await serviceInstance.getTotalStakingBalance();

            return totalStakingBalance;
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.stakingBalance,
        },
    );
}
