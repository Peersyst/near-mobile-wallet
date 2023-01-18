import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Validator } from "module/sdk";

export default function (index?: number): QueryResult<Validator[]> {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    return useQuery(
        [Queries.GET_ALL_VALIDATOR_IDS, usedIndex, network],
        async (): Promise<Validator[]> => {
            return await serviceInstance.getAllValidators();
        },
        {
            enabled: queryEnabled,
        },
    );
}
