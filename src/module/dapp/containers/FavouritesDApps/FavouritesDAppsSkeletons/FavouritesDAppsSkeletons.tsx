import FavouriteDApp from "module/dapp/components/display/FavouriteDApp/FavouriteDApp";
import { FlatList } from "react-native";
import { FavouriteDApp as IFavouriteDApp } from "../../../types";

const EMPTY_FAVOURITES_DAPPS = Array.from<IFavouriteDApp>({ length: 2 }).fill({
    url: Math.random().toString(),
    name: "LoadingDapp",
} as IFavouriteDApp);

function FavouritesDAppsSkeletons(): JSX.Element {
    return (
        <FlatList<IFavouriteDApp>
            data={EMPTY_FAVOURITES_DAPPS}
            scrollEnabled={false}
            style={{ width: "100%" }}
            renderItem={({ item: dApp }) => <FavouriteDApp dApp={dApp} key={dApp.url} loading />}
        />
    );
}

export default FavouritesDAppsSkeletons;
