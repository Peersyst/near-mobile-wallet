import { Col, SuccessIcon, Typography } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { useRecoilValue, useSetRecoilState } from "recoil";
import backupWalletState, { BackUp } from "module/wallet/state/BackUpWalletState";
import Button from "module/common/component/input/Button/Button";
import { usePostHog } from "posthog-react-native";
import settingsState from "module/settings/state/SettingsState";
import Alert from "module/common/component/feedback/Alert/Alert";
import WalletsBackupAdviseAlertContent from "../WalletsBackupAdviseAlertContent/WalletsBackupAdviseAlertContent";
import { SaveIcon } from "icons";
import { WalletsBackupAdviseIcon } from "./WalletsBackupAdvise.styles";

export interface WalletsBackupAdviseProps {
    onSubmit: () => void;
}

export interface HandlePressParams {
    method: BackUp;
}

const WalletsBackupAdvise = ({ onSubmit }: WalletsBackupAdviseProps): JSX.Element => {
    const translate = useTranslate();
    const setState = useSetRecoilState(backupWalletState);
    const posthog = usePostHog();
    const { network } = useRecoilValue(settingsState);

    const handlePress = ({ method }: HandlePressParams) => {
        setState({ method });
        try {
            posthog?.capture("backup", {
                action_type: method,
                chain: network,
            });
        } catch (error) {}

        onSubmit();
    };

    return (
        <Col gap="10%" flex={1} style={{ paddingTop: "7%" }}>
            <Col flex={1} gap="7%" alignItems="center">
                <WalletsBackupAdviseIcon>
                    <SaveIcon />
                </WalletsBackupAdviseIcon>
                <Typography variant="body2Regular" textAlign="center">
                    {translate("backup_wallet_advise_text") + " "}
                </Typography>
                <Alert type="warning" icon={<SuccessIcon />} content={<WalletsBackupAdviseAlertContent />}></Alert>
            </Col>
            <Col gap="4%">
                <Button
                    fullWidth
                    onPress={() =>
                        handlePress({
                            method: "mnemonic",
                        })
                    }
                >
                    {translate("export_mnemonic")}
                </Button>
                <Button
                    fullWidth
                    onPress={() =>
                        handlePress({
                            method: "privateKey",
                        })
                    }
                >
                    {translate("export_private_key")}
                </Button>
            </Col>
        </Col>
    );
};

export default WalletsBackupAdvise;
