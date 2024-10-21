import Typography from "module/common/component/display/Typography/Typography";
import { IconButton, Row, Skeleton } from "@peersyst/react-native-components";
import { FavouriteDApp as IFavouriteDApp } from "../../../types";
import { useState } from "react";
import RemoveFavouriteDAppModal from "module/dapp/containers/RemoveFavouriteDAppModal/RemoveFavouriteDAppModal";
import {
    FavouriteDAppContent,
    FavouriteDAppLinkIcon,
    FavouriteDAppLogo,
    FavouriteDAppOptionsIcon,
    FavouriteDAppRoot,
} from "./FavouriteDApp.styles";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import useConnectedSiteLogo from "module/signer/queries/useConnectedSiteLogo";
import { getHostFromUrl } from "./utils/getHostFromUrl";
import { TouchableWithoutFeedback } from "react-native";

export interface FavouriteDAppProps {
    dApp: IFavouriteDApp;
    loading?: boolean;
}

function FavouriteDApp({ dApp, loading = false }: FavouriteDAppProps): JSX.Element {
    const { navigate } = useNavigation();
    const host = getHostFromUrl(dApp.url);
    const { data: dAppUrl, isLoading: isImageLoading } = useConnectedSiteLogo({ url: host ?? "" });
    const [openRemoveFromFavouritesModal, setOpenRemoveFromFavouritesModal] = useState(false);

    function handleOnLinkPress() {
        navigate(DAppScreens.WEBVIEW, { url: dApp.url });
    }

    return (
        <>
            <FavouriteDAppRoot>
                <TouchableWithoutFeedback onPress={handleOnLinkPress}>
                    <FavouriteDAppContent>
                        <FavouriteDAppLogo loading={loading || isImageLoading} {...(dAppUrl && { source: { uri: dAppUrl } })} />
                        <Skeleton loading={loading} width="50%">
                            <Row flex={1} gap={8} alignItems="center">
                                <FavouriteDAppLinkIcon />
                                <Typography variant="body3Strong" numberOfLines={1} style={{ flex: 1 }}>
                                    {dApp.name}
                                </Typography>
                            </Row>
                        </Skeleton>
                    </FavouriteDAppContent>
                </TouchableWithoutFeedback>
                <Skeleton loading={loading}>
                    <IconButton onPress={() => setOpenRemoveFromFavouritesModal(true)} disabled={loading}>
                        <FavouriteDAppOptionsIcon />
                    </IconButton>
                </Skeleton>
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
