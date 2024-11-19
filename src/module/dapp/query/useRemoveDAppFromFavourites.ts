import { useMutation } from "react-query";
import DAppsController from "../DAppsController";
import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import Queries from "../../../query/queries";
import { usePostHog } from "posthog-react-native";

export default function useRemoveDAppFromFavourites() {
    const invalidateQueries = useInvalidateQueries();
    const posthog = usePostHog();

    return useMutation(
        async (url: string) => {
            try {
                posthog?.capture("remove_dapp_from_favourites", { url });
            } catch {}
            await DAppsController.deleteDApp(url);
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_FAVOURITES_DAPPS]);
            },
        },
    );
}
