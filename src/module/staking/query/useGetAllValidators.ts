import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { getValidatorsWithStatus } from "../utils/validator";
import { Validator } from "near-peersyst-sdk";

export default function (): QueryResult<Validator[]> {
    const { network, serviceInstance, queryEnabled } = useServiceInstance(0);
    return useQuery(
        [Queries.GET_ALL_VALIDATOR_IDS, network],
        async (): Promise<Validator[]> => {
            const allValidators = await serviceInstance.getAllValidators();
            return getValidatorsWithStatus(allValidators, allValidators);
        },
        {
            enabled: queryEnabled,
        },
    );
}
