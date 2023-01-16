import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";
import { QueryResult } from "query-utils";
import { Validator } from "module/sdk";

export default function (validatorId: string, index?: number): QueryResult<Validator> {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery([Queries.GET_VALIDATOR_DATA, usedIndex, network], async (): Promise<Validator> => {
        return await serviceInstance.getValidatorDataFromId(validatorId, true);
    });
}
