import { Col, Label, Row, Typography } from "@peersyst/react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { WalletsBackupAdviseImage } from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletBackupAdvise.styles";
import { notes } from "images";
import { useTranslate } from "module/common/hook/useTranslate";
import { BackUp } from "../WalletsBackupModal";
import { useRecoilState } from "recoil";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import { useEffect } from "react";
import Button from "module/common/component/input/Button/Button";

export interface WalletsBackupAdvise {
    onSubmit: (method: BackUp) => void;
}

const WalletsBackupAdvise = ({ onSubmit }: WalletsBackupAdvise): JSX.Element => {
    const translate = useTranslate();
    const [{ method }, setMethod] = useRecoilState(backupWalletState);
    const handlePress = (method: BackUp) => setMethod({ method });

    useEffect(() => {
        console.log("method", method);
        if (method) onSubmit(method);
    }, [method]);

    return (
        <Col gap="10%" flex={1}>
            <Col flex={1} gap="3%">
                <Typography variant="body3Strong" textAlign="center">
                    Keep them safe
                </Typography>
                <Col gap="3%">
                    <Typography variant="body3Regular" textAlign="center">
                        {translate("backup_wallet_advise_text") + " "}
                        <Typography variant="body3Strong" textAlign="center">
                            {translate("backup_wallet_advise_text_2")}
                        </Typography>
                    </Typography>
                </Col>
            </Col>
            <Col gap="4%">
                <Button fullWidth onPress={() => handlePress("mnemonic")}>
                    {translate("back_up_now")}
                </Button>
                <Button fullWidth onPress={() => handlePress("mnemonic")}>
                    {translate("back_up_now")}
                </Button>
            </Col>
        </Col>
    );
};

export default WalletsBackupAdvise;
