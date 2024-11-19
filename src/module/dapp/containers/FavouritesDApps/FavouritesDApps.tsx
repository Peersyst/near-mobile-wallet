import Typography from "module/common/component/display/Typography/Typography";
import { useGetFavouritesDApps } from "module/dapp/query/useGetFavouritesDApps";
import { FavouritesDAppsRoot } from "./FavouritesDApps.styles";
import EmptyFavouritesDApps from "./EmptyFavouritesDApps/EmptyFavouritesDApps";
import useTranslate from "module/common/hook/useTranslate";
import FavouriteDApp from "module/dapp/components/display/FavouriteDApp/FavouriteDApp";
import { FlatList } from "react-native";
import FavouritesDAppsSkeletons from "./FavouritesDAppsSkeletons/FavouritesDAppsSkeletons";
import { Skeleton } from "@peersyst/react-native-components";

function FavouritesDApps(): JSX.Element {
    const translate = useTranslate();
    const { data: dApps, isLoading } = useGetFavouritesDApps();
    const hasDApps = dApps && dApps.length > 0;

    return (
        <FavouritesDAppsRoot>
            {(hasDApps || isLoading) && (
                <Skeleton loading={isLoading}>
                    <Typography variant="body2Strong">{translate("yourFavouritesDApps")}</Typography>
                </Skeleton>
            )}
            {isLoading ? (
                <FavouritesDAppsSkeletons />
            ) : (
                <FlatList
                    data={dApps}
                    scrollEnabled={false}
                    ListEmptyComponent={<EmptyFavouritesDApps />}
                    style={{ width: "100%" }}
                    renderItem={({ item: dApp }) => <FavouriteDApp dApp={dApp} key={dApp.url} />}
                />
            )}
        </FavouritesDAppsRoot>
    );
}

export default FavouritesDApps;
