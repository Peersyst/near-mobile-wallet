import useServiceInstance from "../hook/useServiceInstance";
import BigNumber from "bignumber.js";
import ServiceInstances from "../state/ServiceInstances/ServiceInstances";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";
import { config } from "config";

const useGetBalanceAllAccounts = () => {
    const { network } = useServiceInstance();

    return useQuery(
        [Queries.GET_BALANCE_ALL_ACCOUNTS, network],
        async () => {
            const serviceInstances = ServiceInstances.getServiceInstances(network);

            const promises = serviceInstances.map(async (serviceInstance) => {
                const balance = await serviceInstance.getAccountBalance();
                return BigNumber(balance.available).toNumber();
            });

            const balances = await Promise.allSettled(promises);

            const totalBalance = balances.reduce((acc, balance) => {
                if (balance.status === "fulfilled") {
                    return acc.plus(balance.value);
                }
                return acc;
            }, new BigNumber(0));
            return totalBalance.toString();
        },
        { refetchInterval: config.refetchIntervals.balance },
    );
};

export default useGetBalanceAllAccounts;
