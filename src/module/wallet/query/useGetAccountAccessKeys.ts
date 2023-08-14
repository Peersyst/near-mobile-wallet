import { UseQueryResult, useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import Queries from "../../../query/queries";
import { ConnectedSite } from "../component/display/ConnectedSite/ConnectedSite.types";
import useParsedConnectedSites from "../hook/useParseConnectedSites";

export default function useGetAccountAccessKeys(): UseQueryResult<ConnectedSite[], unknown> {
    const { index, network, serviceInstance } = useServiceInstance();
    const parseConnectedSites = useParsedConnectedSites();

    return useQuery([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network], () => serviceInstance!.getAccessKeys(), {
        enabled: !!serviceInstance,
        select: (data) => parseConnectedSites(data),
    });
}
