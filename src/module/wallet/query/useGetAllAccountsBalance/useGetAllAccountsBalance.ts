import useServiceInstance from "../../hook/useServiceInstance";
import ServiceInstances from "../../state/ServiceInstances/ServiceInstances";
import { useQuery, UseQueryResult } from "react-query";
import Queries from "../../../../query/queries";
import { config } from "config";
import processGetAccountBalanceBatch from "./utils/processGetAccountBalanceBatch";
import { BalanceOperations, convertYoctoToNear } from "near-peersyst-sdk";

export type UseGetAllAccountsBalanceReturn = UseQueryResult<string, unknown>;

const useGetAllAccountsBalance = (): UseGetAllAccountsBalanceReturn => {
    const { network } = useServiceInstance();

    return useQuery(
        [Queries.GET_BALANCE_ALL_ACCOUNTS, network],
        async () => {
            const serviceInstances = ServiceInstances.getServiceInstances(network);
            const batchSize = 5;
            let totalBalance = "0";

            for (let i = 0; i < serviceInstances.length; i += batchSize) {
                const batch = serviceInstances.slice(i, i + batchSize);
                const batchAmount = await processGetAccountBalanceBatch(batch);
                totalBalance = BalanceOperations.BNAdd(batchAmount, totalBalance);
            }

            return convertYoctoToNear(BigInt(totalBalance).toString());
        },
        { refetchInterval: config.refetchIntervals.balance },
    );
};

export default useGetAllAccountsBalance;
