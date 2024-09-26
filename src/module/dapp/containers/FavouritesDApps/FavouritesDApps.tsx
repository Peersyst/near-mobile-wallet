import Typography from "module/common/component/display/Typography/Typography";
import useGetFavouritesDApps from "module/dapp/query/useGetFavouritesDApps";
import { FavouritesDAppsRoot } from "./FavouritesDApps.styles";
import EmptyFavouritesDApps from "./EmptyFavouritesDApps/EmptyFavouritesDApps";
import { List } from "@peersyst/react-native-components";

export interface FavouritesDAppsProps {
    children?: React.ReactNode;
}

function FavouritesDApps({ children, ...rest }: FavouritesDAppsProps) {
    const { data: dApps } = useGetFavouritesDApps();
    return (
        <FavouritesDAppsRoot {...rest}>
            <Typography variant="body2Strong">Your favorite apps</Typography>
            <List
                data={dApps}
                scrollEnabled
                ListEmptyComponent={<EmptyFavouritesDApps />}
                style={{ width: "100%" }}
                renderItem={({ item }) => <Typography variant="body2Light">{item.name}</Typography>}
            />
        </FavouritesDAppsRoot>
    );
}

export default FavouritesDApps;
