import { Col, Row, Typography } from "@peersyst/react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { WalletsBackupAdviseImage } from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletBackupAdvise.styles";
import { notes } from "images";
import { useTranslate } from "module/common/hook/useTranslate";
import { BackUp } from "../WalletsBackupModal";
import { useRecoilState } from "recoil";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import { useEffect } from "react";

export interface WalletsBackupAdvise {
    onSubmit: (method: BackUp) => void;
}

const WalletsBackupAdvise = ({ onSubmit }: WalletsBackupAdvise): JSX.Element => {
    const translate = useTranslate();
    const [{ method }, setMethod] = useRecoilState(backupWalletState);
    const handlePress = (method: BackUp) => () => setMethod(method);

    useEffect(() => {
        if (method) onSubmit(method);
    }, [method]);

    return (
        <Col gap="10%" flex={1}>
            <Col flex={1}>
                <Row flex={1} justifyContent="center" alignItems="center">
                    <WalletsBackupAdviseImage source={notes} />
                </Row>
                <Col gap="3%">
                    <Typography variant="body3Regular" textAlign="center">
                        {translate("backup_wallet_advise_text")}
                    </Typography>
                    <Typography variant="body3Strong" textAlign="center">
                        {translate("backup_wallet_advise_text_2")}
                    </Typography>
                </Col>
            </Col>
            <Col gap="4%">
                <CountdownButton seconds={5} fullWidth onPress={() => handlePress("mnemonic")}>
                    {translate("back_up_now")}
                </CountdownButton>
                <CountdownButton seconds={5} fullWidth onPress={() => handlePress("mnemonic")}>
                    {translate("back_up_now")}
                </CountdownButton>
            </Col>
        </Col>
    );
};

export default WalletsBackupAdvise;
