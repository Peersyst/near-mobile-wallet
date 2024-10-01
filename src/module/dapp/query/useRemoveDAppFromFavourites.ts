import { useMutation } from "react-query";
import DAppsController from "../DAppsController";
import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import Queries from "../../../query/queries";

export default function useRemoveDAppFromFavourites() {
    const invalidateQueries = useInvalidateQueries();
    return useMutation(
        async (url: string) => {
            await DAppsController.deleteDApp(url);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_FAVOURITES_DAPPS]);
            },
        },
    );
}
