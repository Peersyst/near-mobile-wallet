import { UseQueryResult, useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import Queries from "../../../query/queries";
import { AccessKeyInfoView } from "near-api-js/lib/providers/provider";

export default function useGetAccountAccessKeys(): UseQueryResult<AccessKeyInfoView[], unknown> {
    const { index, network, serviceInstance } = useServiceInstance();

    return useQuery([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network], () => serviceInstance!.getAccessKeys(), {
        enabled: !!serviceInstance,
    });
}
