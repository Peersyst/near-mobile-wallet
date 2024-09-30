import { useMutation } from "react-query";
import DAppsController from "../DAppsController";
import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import Queries from "../../../query/queries";

export default function useAddSearch() {
    const invalidateQueries = useInvalidateQueries();
    return useMutation(
        async (search: string) => {
            await DAppsController.addHistory(search);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_DAPPS_SEARCH_HISTORY]);
            },
        },
    );
}
