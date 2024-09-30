import { useQuery, UseQueryResult } from "react-query";
import Queries from "../../../query/queries";
import { FavouriteDApp } from "../types";
import DAppsController from "../DAppsController";

export default function (): UseQueryResult<FavouriteDApp[]> {
    return useQuery([Queries.GET_FAVOURITES_DAPPS], async (): Promise<FavouriteDApp[]> => {
        return await DAppsController.getDApps();
    });
}
