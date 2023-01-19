import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";
import { Validator } from "near-peersyst-sdk";

export default function (validatorId: string, index?: number) {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    return useQuery(
        [Queries.GET_VALIDATOR_DATA_ID, usedIndex, network],
        async (): Promise<Validator> => {
            return await serviceInstance.getValidatorDataFromId(validatorId.toString(), true);
        },
        {
            enabled: queryEnabled,
        },
    );
}
