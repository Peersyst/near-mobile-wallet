import { useMemo } from "react";
import useParsedConnectedSites from "../hooks/useParseConnectedSites";
import useGetAccountAccessKeys from "../../wallet/query/useGetAccountAccessKeys";

export default function useGetConnectedSites() {
    const parseConnectedSites = useParsedConnectedSites();

    const { data: accessKeys, ...queryRest } = useGetAccountAccessKeys();

    return useMemo(() => {
        return { sites: accessKeys ? parseConnectedSites(accessKeys) : accessKeys, ...queryRest };
    }, [accessKeys, parseConnectedSites]);
}
