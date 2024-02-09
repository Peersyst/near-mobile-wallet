import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { config } from "refactor/common/config";

export interface UseGetActionsOptions {
    /**
     * Index of the account to use
     */
    index?: number;
}

const useGetActions = ({ index }: UseGetActionsOptions = {}) => {
    const { serviceInstance, index: usedIndex, network, queryEnabled } = useServiceInstance(index);
    return useQuery(
        [Queries.ACTIONS, usedIndex, network],
        async () => {
            return await serviceInstance.getRecentActivity();
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.transactions,
        },
    );
};

export default useGetActions;
