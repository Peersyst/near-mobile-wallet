import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";

export interface UseGetActionsOptions {
    /**
     * Index of the wallet to use
     */
    index?: number;
}

const useGetActions = ({ index }: UseGetActionsOptions = {}) => {
    const { serviceInstance, index: usedIndex, network } = useServiceInstance(index);
    return useQuery([Queries.ACTIONS, usedIndex, network], async () => {
        try {
            return await serviceInstance.getRecentActivity();
        } catch (e) {
            console.log(e);
            return [];
        }
    });
};

export default useGetActions;
