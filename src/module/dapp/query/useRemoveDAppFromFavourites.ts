import { useMutation } from "react-query";
import DAppsController from "../DAppsController";
import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import Queries from "../../../query/queries";
import { StoredDApp } from "../state/DAppsState";

export default function useRemoveDAppFromFavourites() {
    const invalidateQueries = useInvalidateQueries();
    return useMutation(
        async (dApp: StoredDApp) => {
            await DAppsController.deleteDApp(dApp);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_FAVOURITES_DAPPS]);
            },
        },
    );
}
