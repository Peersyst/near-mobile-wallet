import { DAppProps } from "./DApp.types";
import { DAppRoot, DAppLogo, DAppTag, DAppLinkIcon } from "./DApp.styles";
import { Col, Row, Skeleton, Typography } from "@peersyst/react-native-components";
import DAppStatus from "../DAppStatus/DAppStatus";
import { Linking } from "react-native";
// TouchableOpacity from react-native-gesture-handler handles touches with Swipeable.
// Otherwise, Swipeable triggers the `onPress`
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import useWalletState from "module/wallet/hook/useWalletState";
import { usePostHog } from "posthog-react-native";

const DApp = ({ dapp, connected = false, loading = false }: DAppProps): JSX.Element => {
    const { name, description, logoUrl, url, tag } = dapp;
    const {
        state: { selectedWallet, wallets },
    } = useWalletState();
    const { network } = useRecoilValue(settingsState);
    const posthog = usePostHog();

    function handleOnPress(): void {
        posthog?.capture("dapp_click", {
            wallet_address: wallets[selectedWallet].account,
            dapp_url: url,
            dapp_name: name,
            chain: network,
        });
        Linking.openURL(url);
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
        </DAppRoot>
    );
};

export default DApp;
