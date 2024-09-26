import { useQuery, UseQueryResult } from "react-query";
import Queries from "../../../query/queries";
import { StoredDApp } from "../state/DAppsState";
import DAppsController from "../DAppsController";

export default function (): UseQueryResult<StoredDApp[]> {
    return useQuery([Queries.GET_FAVOURITES_DAPPS], async (): Promise<StoredDApp[]> => {
        return await DAppsController.getDApps();
    });
}
