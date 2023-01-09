import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQuery } from "react-query";
import { StakingBalance } from "module/sdk";
import { QueryResult } from "query-utils";

export default function (index?: number): QueryResult<StakingBalance> {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery(["staking", usedIndex, network], async (): Promise<StakingBalance> => {
        return await serviceInstance.getTotalStakingBalance();
    });
}
