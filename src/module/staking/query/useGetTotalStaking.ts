import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQuery } from "react-query";
import { StakingBalance } from "module/sdk";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import useSameWallet from "module/wallet/hook/useSameWallet";

export default function (index?: number, onlySelectedWallet?: boolean): QueryResult<StakingBalance> {
    const { sameWallet } = useSameWallet();
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    const queryEnabled = !!serviceInstance && (onlySelectedWallet ? sameWallet(index) : true);
    return useQuery(
        [Queries.TOTAL_STAKING_BALANCE, usedIndex, network],
        async (): Promise<StakingBalance> => {
            return await serviceInstance.getTotalStakingBalance();
        },
        {
            enabled: queryEnabled,
        },
    );
}
