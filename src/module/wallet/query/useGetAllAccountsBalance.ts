import useServiceInstance from "../hook/useServiceInstance";
import BigNumber from "bignumber.js";
import ServiceInstances from "../state/ServiceInstances/ServiceInstances";
import { useQuery, UseQueryResult } from "react-query";
import Queries from "../../../query/queries";
import { config } from "config";

type useGetAllAccountsBalanceReturn = UseQueryResult<string, unknown>;

const useGetAllAccountsBalance = (): useGetAllAccountsBalanceReturn => {
    const { network } = useServiceInstance();

    return useQuery(
        [Queries.GET_BALANCE_ALL_ACCOUNTS, network],
        async () => {
            const serviceInstances = ServiceInstances.getServiceInstances(network);

            const balancesPromises = serviceInstances.map(async (serviceInstance) => {
                try {
                    const balance = await serviceInstance.getAccountBalance();
                    return BigNumber(balance.available).toNumber();
                } catch (error) {
                    return 0; // Or handle the error accordingly
                }
            });

            const balances = await Promise.allSettled(balancesPromises);

            const totalBalance = balances.reduce((acc, balance) => {
                if (balance.status === "fulfilled") {
                    return acc.plus(new BigNumber(balance.value));
                }
                return acc;
            }, new BigNumber(0));

            return totalBalance.toString();
        },
        { refetchInterval: config.refetchIntervals.balance },
    );
};

export default useGetAllAccountsBalance;
