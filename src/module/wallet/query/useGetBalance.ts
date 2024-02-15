import Queries from "../../../query/queries";
import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import { config } from "config";
import { usePostHog } from "posthog-react-native";

const useGetBalance = (index?: number) => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    const posthog = usePostHog();

    return useQuery(
        [Queries.GET_BALANCE, usedIndex, network],
        async () => {
            const balance = await serviceInstance.getAccountBalance();

            try {
                posthog?.capture("load_wallet_info", {
                    wallet_address: serviceInstance.getAddress(),
                    balance: balance.available,
                    chain: network,
                });
            } catch (error) {}

            return balance;
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.balance,
        },
    );
};

export default useGetBalance;
