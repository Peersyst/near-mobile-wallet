import { useMutation } from "react-query";
import DAppsController from "../DAppsController";
import { useInvalidateQueries } from "../../../query/useInvalidateQueries";
import Queries from "../../../query/queries";
import { FavouriteDApp } from "../types";
import { usePostHog } from "posthog-react-native";

export default function useAddDAppToFavourites() {
    const invalidateQueries = useInvalidateQueries();
    const posthog = usePostHog();

    return useMutation(
        async (dApp: FavouriteDApp) => {
            await DAppsController.addDApp(dApp);
            try {
                posthog?.capture("add_dapp_to_favourites", { ...dApp });
            } catch {}
        },
        {
            onSuccess: () => {
                invalidateQueries([Queries.GET_FAVOURITES_DAPPS]);
            },
        },
    );
}
