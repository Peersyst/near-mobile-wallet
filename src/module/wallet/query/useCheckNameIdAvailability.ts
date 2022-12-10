import { useQuery, UseQueryResult } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import Queries from "../../../query/queries";

const useCheckNameAvailability = (name?: string): UseQueryResult<boolean> => {
    const { serviceInstance, network } = useServiceInstance(0);
    return useQuery(
        [Queries.NAME_ID_AVAILABILITY, name, network],
        async () => {
            return await serviceInstance?.nameIsChoosalbe(name!);
        },
        {
            enabled: !!name && name !== ".near" && !!serviceInstance,
            cacheTime: 0,
        },
    );
};

export default useCheckNameAvailability;
