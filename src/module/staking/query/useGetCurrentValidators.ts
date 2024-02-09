import { Validator } from "module/sdk";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { config } from "refactor/common/config";

export default function (index?: number): QueryResult<Validator[]> {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    return useQuery(
        [Queries.GET_CURRENT_VALIDATORS, usedIndex, network],
        async (): Promise<Validator[]> => {
            return await serviceInstance.getCurrentValidators();
        },
        { enabled: queryEnabled, refetchInterval: config.refetchIntervals.validators },
    );
}
