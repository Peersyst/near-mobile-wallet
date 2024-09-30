import { useMutation } from "react-query";
import DAppsController from "../DAppsController";
import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import Queries from "../../../query/queries";
import { FavouriteDApp } from "../types";

export default function useRemoveDAppFromFavourites() {
    const invalidateQueries = useInvalidateQueries();
    return useMutation(
        async (dApp: FavouriteDApp) => {
            await DAppsController.deleteDApp(dApp);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_FAVOURITES_DAPPS]);
            },
        },
    );
}
