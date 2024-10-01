import { useQuery, UseQueryOptions } from "react-query";
import Queries from "../../../query/queries";
import { FavouriteDApp } from "../types";
import DAppsController from "../DAppsController";

export function useGetFavouritesDApps<TData = FavouriteDApp[]>(
    options: Omit<UseQueryOptions<FavouriteDApp[], unknown, TData, Queries[]>, "queryFn" | "queryKey"> = {},
) {
    return useQuery(
        [Queries.GET_FAVOURITES_DAPPS],
        () => {
            return DAppsController.getDApps();
        },
        options,
    );
}
