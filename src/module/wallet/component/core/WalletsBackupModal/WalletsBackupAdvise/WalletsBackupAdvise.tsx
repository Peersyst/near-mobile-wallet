import { Col, Typography } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { useSetRecoilState } from "recoil";
import backupWalletState, { BackUp } from "module/wallet/state/BackUpWalletState";
import Button from "module/common/component/input/Button/Button";
import { ConfirmPinModalWrapper } from "module/settings/components/core/ConfirmPinModal/ConfirmPinModalWrapper";
import Advise from "module/common/component/display/Advise/Advise";
import { ConfirmPinModalWrapperPropsRenderProps } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect.types";

export interface WalletsBackupAdvise {
    onSubmit: () => void;
}

export interface HandlePressParams {
    showModal: ConfirmPinModalWrapperPropsRenderProps["showModal"];
    method: BackUp;
}

const WalletsBackupAdvise = ({ onSubmit }: WalletsBackupAdvise): JSX.Element => {
    const translate = useTranslate();
    const setState = useSetRecoilState(backupWalletState);

    const handlePress = ({ method, showModal }: HandlePressParams) => {
        setState({ method });
        showModal();
    };

    return (
        <ConfirmPinModalWrapper onPinConfirmed={onSubmit}>
            {({ showModal }) => (
                <Col gap="10%" flex={1}>
                    <Col flex={1} gap="3%">
                        <Advise title={translate("keep_this_safe")} />
                        <Col gap="3%">
                            <Typography variant="body3Regular" textAlign="center">
                                {translate("backup_wallet_advise_text") + " "}
                            </Typography>
                            <Typography variant="body3Strong" textAlign="center">
                                {translate("backup_wallet_advise_text_2")}
                            </Typography>
                        </Col>
                    </Col>
                    <Col gap="4%">
                        <Button
                            fullWidth
                            onPress={() =>
                                handlePress({
                                    method: "mnemonic",
                                    showModal,
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
                                    showModal,
                                })
                            }
                        >
                            {translate("export_private_key")}
                        </Button>
                    </Col>
                </Col>
            )}
        </ConfirmPinModalWrapper>
    );
};

export default WalletsBackupAdvise;
