import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { getAllValidatorsWithStatus } from "../utils/validator";
import { StakingValidator } from "../hook/useGetStakingValidators";

export default function (index?: number): QueryResult<StakingValidator[]> {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery([Queries.GET_ALL_VALIDATOR_IDS, usedIndex, network], async (): Promise<StakingValidator[]> => {
        return getAllValidatorsWithStatus(await serviceInstance.getAllValidators());
    });
}
