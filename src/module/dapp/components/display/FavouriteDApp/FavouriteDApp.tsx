import Typography from "module/common/component/display/Typography/Typography";
import { IconButton } from "@peersyst/react-native-components";
import { FavouriteDApp as IFavouriteDApp } from "../../../types";
import { useState } from "react";
import { ExternalLinkIcon } from "icons";
import RemoveFavouriteDAppModal from "module/dapp/containers/RemoveFavouriteDAppModal/RemoveFavouriteDAppModal";
import { FavouriteDAppLinkIcon, FavouriteDAppLogo, FavouriteDAppOptionsIcon, FavouriteDAppRoot } from "./FavouriteDApp.styles";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import useConnectedSiteLogo from "module/signer/queries/useConnectedSiteLogo";
import * as URL from "url";

export interface FavouriteDAppProps {
    dApp: IFavouriteDApp;
}

const getHostFromUrl = (url: string): string | null => {
    try {
        return URL.parse(url).host;
    } catch (error) {
        return null;
    }
};

function FavouriteDApp({ dApp }: FavouriteDAppProps) {
    const { navigate } = useNavigation();
    const host = getHostFromUrl(dApp.url);
    const { data: dAppUrl, isLoading } = useConnectedSiteLogo({ url: host ?? "" });
    const [openRemoveFromFavouritesModal, setOpenRemoveFromFavouritesModal] = useState(false);

    function handleOnLinkPress() {
        navigate(DAppScreens.WEBVIEW, { url: dApp.url });
    }

    return (
        <>
            <FavouriteDAppRoot>
                <FavouriteDAppLogo loading={isLoading} {...(dAppUrl && { source: { uri: dAppUrl } })} />
                <FavouriteDAppLinkIcon onPress={handleOnLinkPress}>
                    <ExternalLinkIcon />
                </FavouriteDAppLinkIcon>
                <Typography variant="body3Strong" numberOfLines={1} style={{ flex: 1 }}>
                    {dApp.name}
                </Typography>
                <IconButton onPress={() => setOpenRemoveFromFavouritesModal(true)}>
                    <FavouriteDAppOptionsIcon />
                </IconButton>
            </FavouriteDAppRoot>
            <RemoveFavouriteDAppModal
                open={openRemoveFromFavouritesModal}
                onClose={() => setOpenRemoveFromFavouritesModal(false)}
                dApp={dApp}
            />
        </>
    );
}

export default FavouriteDApp;
