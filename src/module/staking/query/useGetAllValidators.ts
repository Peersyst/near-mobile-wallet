import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Validator } from "near-peersyst-sdk";
import { config } from "config";

export default function (): QueryResult<Validator[]> {
    const { network, serviceInstance, queryEnabled } = useServiceInstance(0);
    return useQuery(
        [Queries.GET_ALL_VALIDATORS, network],
        async (): Promise<Validator[]> => {
            return await serviceInstance.getAllValidators();
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.validators,
        },
    );
}
