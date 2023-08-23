import { useMemo } from "react";
import useParsedConnectedSites from "../hook/useParseConnectedSites";
import useGetAccountAccessKeys from "./useGetAccountAccessKeys";

export default function useGetConnectedSites() {
    const parseConnectedSites = useParsedConnectedSites();

    const { data: accessKeys, ...queryRest } = useGetAccountAccessKeys();

    return useMemo(() => {
        return { sites: accessKeys ? parseConnectedSites(accessKeys) : accessKeys, ...queryRest };
    }, [accessKeys]);
}
