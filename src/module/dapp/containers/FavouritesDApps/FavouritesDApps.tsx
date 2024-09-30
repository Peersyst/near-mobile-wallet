import Typography from "module/common/component/display/Typography/Typography";
import useGetFavouritesDApps from "module/dapp/query/useGetFavouritesDApps";
import { FavouritesDAppsRoot } from "./FavouritesDApps.styles";
import EmptyFavouritesDApps from "./EmptyFavouritesDApps/EmptyFavouritesDApps";
import { List } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import FavouriteDApp from "module/dapp/components/display/FavouriteDApp/FavouriteDApp";

export interface FavouritesDAppsProps {
    children?: React.ReactNode;
}

function FavouritesDApps({ children, ...rest }: FavouritesDAppsProps) {
    const translate = useTranslate();
    const { data: dApps } = useGetFavouritesDApps();
    const hasDApps = dApps && dApps.length > 0;

    return (
        <FavouritesDAppsRoot {...rest}>
            {hasDApps && <Typography variant="body2Strong">{translate("yourFavouritesDApps")}</Typography>}
            <List
                data={dApps}
                scrollEnabled
                ListEmptyComponent={<EmptyFavouritesDApps />}
                style={{ width: "100%" }}
                renderItem={({ item: dApp }) => <FavouriteDApp dApp={dApp} key={dApp.url} />}
            />
        </FavouritesDAppsRoot>
    );
}

export default FavouritesDApps;
