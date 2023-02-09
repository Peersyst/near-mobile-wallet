import { useQuery, UseQueryResult } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import Queries from "../../../query/queries";
import useGetSuffix from "../hook/useGetSuffix";

const useCheckNameAvailability = (walletIndex: number, name: string): UseQueryResult<boolean> => {
    const { serviceInstance, network } = useServiceInstance(walletIndex);
    const suffix = useGetSuffix();

    const enabled = !!name && name !== suffix && name !== "" && !!serviceInstance;

    return useQuery(
        [Queries.NAME_ID_AVAILABILITY, name, network],
        async () => {
            return await serviceInstance?.nameIsChoosalbe(name!);
        },
        {
            enabled,
            cacheTime: 0,
        },
    );
};

export default useCheckNameAvailability;
