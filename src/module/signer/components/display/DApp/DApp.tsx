import { DAppProps } from "./DApp.types";
import { DAppRoot, DAppLogo, DAppTag, DAppLinkIcon } from "./DApp.styles";
import { Col, Row, Skeleton, Typography } from "@peersyst/react-native-components";
import DAppStatus from "../DAppStatus/DAppStatus";
// TouchableOpacity from react-native-gesture-handler handles touches with Swipeable.
// Otherwise, Swipeable triggers the `onPress`
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import useWalletState from "module/wallet/hook/useWalletState";
import { usePostHog } from "posthog-react-native";
import { DAppWebViewModal } from "../../../containers/DAppWebViewModal/DAppWebViewModal";
import { useModalState } from "../../../../common/hook/useModalState";
import { Linking, Platform } from "react-native";

const DApp = ({ dapp, connected = false, loading = false }: DAppProps): JSX.Element => {
    const { name, description, logoUrl, url, tag } = dapp;

    const {
        state: { selectedWallet, wallets },
    } = useWalletState();
    const { network } = useRecoilValue(settingsState);
    const posthog = usePostHog();
    const { open: openDAppWebViewModal, showModal: showDAppWebViewModal, hideModal: hideDAppWebViewModal } = useModalState();

    function handleOnPress(): void {
        try {
            posthog?.capture("dapp_click", {
                wallet_address: wallets[selectedWallet].account,
                dapp_url: url,
                dapp_name: name,
                chain: network,
            });
        } catch (error) {}
        if (Platform.OS === "android") {
            Linking.openURL(url);
        } else {
            showDAppWebViewModal();
        }
    }
    return (
        <DAppRoot gap={16}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleOnPress}>
                <Row gap={16} alignItems="center">
                    <DAppLogo source={{ uri: logoUrl }} />
                    <Col flex={1}>
                        <Skeleton loading={loading}>
                            <Row justifyContent="center" alignItems="center">
                                <DAppLinkIcon />
                                <Typography variant="body2Strong" numberOfLines={1} style={{ flex: 1 }}>
                                    {name}
                                </Typography>
                                <DAppStatus connected={connected} />
                            </Row>
                        </Skeleton>
                        <Skeleton loading={loading}>
                            <DAppTag variant="body4Strong">{`#${tag}`}</DAppTag>
                        </Skeleton>
                        <Skeleton loading={loading}>
                            <Typography variant="body4Strong" light numberOfLines={2}>
                                {description}
                            </Typography>
                        </Skeleton>
                    </Col>
                </Row>
            </TouchableOpacity>
            <DAppWebViewModal url={url} name={name} open={openDAppWebViewModal} onClose={hideDAppWebViewModal} />
        </DAppRoot>
    );
};

export default DApp;
