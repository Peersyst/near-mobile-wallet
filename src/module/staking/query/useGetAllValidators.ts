import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQuery } from "react-query";
import { Validator } from "module/sdk";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";

export default function (index?: number): QueryResult<Validator[]> {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery([Queries.ALL_VALIDATORS_STAKING, usedIndex, network], async (): Promise<Validator[]> => {
        return await serviceInstance.getAllValidators();
    });
}
