import { useQuery, UseQueryResult } from "react-query";
import Queries from "../../../query/queries";
import DAppsController from "../DAppsController";

export default function (): UseQueryResult<string[]> {
    return useQuery([Queries.GET_DAPPS_SEARCH_HISTORY], async (): Promise<string[]> => {
        return await DAppsController.getHistory();
    });
}
