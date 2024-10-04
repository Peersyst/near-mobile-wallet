import { useGetFavouritesDApps } from "./useGetFavouritesDApps";

export function useIsUrlInFavourites(url: string) {
    return useGetFavouritesDApps({ select: (data) => data.some((dapp) => dapp.url === url) });
}
