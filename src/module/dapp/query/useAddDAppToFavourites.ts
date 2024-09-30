import { useMutation } from "react-query";
import DAppsController from "../DAppsController";
import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import Queries from "../../../query/queries";
import { StoredDApp } from "../state/DAppsState";

export default function useAddDAppFromFavourites() {
    const invalidateQueries = useInvalidateQueries();
    return useMutation(
        async (dApp: StoredDApp) => {
            await DAppsController.addDApp(dApp);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_FAVOURITES_DAPPS]);
            },
        },
    );
}
