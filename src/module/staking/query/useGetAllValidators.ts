import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { getValidatorsWithStatus } from "../utils/validator";
import { Validator } from "near-peersyst-sdk";
import { config } from "refactor/common/config";

export default function (): QueryResult<Validator[]> {
    const { network, serviceInstance, queryEnabled } = useServiceInstance(0);
    return useQuery(
        [Queries.GET_ALL_VALIDATORS, network],
        async (): Promise<Validator[]> => {
            const allValidators = await serviceInstance.getAllValidators();
            return getValidatorsWithStatus(allValidators, allValidators);
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.validators,
        },
    );
}
