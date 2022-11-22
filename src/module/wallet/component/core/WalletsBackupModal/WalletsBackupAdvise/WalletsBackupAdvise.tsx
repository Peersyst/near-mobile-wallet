import { Col, Row, Typography } from "@peersyst/react-native-components";
import Card from "module/common/component/surface/Card/Card";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { useState } from "react";
import { WalletsBackupAdviseImage } from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletBackupAdvise.styles";
import { notes } from "images";
import { useTranslate } from "module/common/hook/useTranslate";

export interface WalletsBackupAdvise {
    onWalletSelected: (index: number) => void;
}

const WalletsBackupAdvise = ({ onWalletSelected }: WalletsBackupAdvise): JSX.Element => {
    const [selectorEnabled, setSelectorEnabled] = useState(false);
    const translate = useTranslate();
    return (
        <Col gap={40} justifyContent="flex-end" flex={1}>
            <Row flex={1} justifyContent="center" alignItems="center">
                <WalletsBackupAdviseImage source={notes} />
            </Row>
            <Card>
                <Typography variant="body3Regular">{translate("backup_wallet_advise_text")}</Typography>
            </Card>
            <WalletSelector
                disabled={!selectorEnabled}
                display={
                    <CountdownButton seconds={5} onCountdownEnd={() => setSelectorEnabled(true)} fullWidth>
                        {translate("back_up_now")}
                    </CountdownButton>
                }
                onChange={(index) => onWalletSelected(index as number)}
                value={-1}
            />
        </Col>
    );
};

export default WalletsBackupAdvise;
