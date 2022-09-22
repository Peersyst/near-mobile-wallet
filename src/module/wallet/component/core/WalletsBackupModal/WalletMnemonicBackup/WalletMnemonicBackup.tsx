import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import { ActivityIndicator } from "react-native";
import { Col, Typography } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import Card from "module/common/component/surface/Card/Card";
import { useTranslate } from "module/common/hook/useTranslate";

export interface WalletMnemonicBackupProps {
    walletIndex: number;
    onClose: () => void;
}

const WalletMnemonicBackup = ({ walletIndex, onClose }: WalletMnemonicBackupProps): JSX.Element => {
    const [mnemonic, setMnemonic] = useState<string[]>();
    const translate = useTranslate();
    useEffect(() => {
        const getStorageMnemonic = async () => {
            setMnemonic(await WalletStorage.getMnemonic(walletIndex));
        };
        getStorageMnemonic();
    }, [walletIndex]);

    if (!mnemonic) return <ActivityIndicator size="large" />;
    return (
        <Col flex={1} gap={30} justifyContent="flex-end">
            <Card>
                <Col gap={30}>
                    <Typography variant="h3" fontWeight="bold" textTransform="uppercase" textAlign="center">
                        {translate("keep_this_safe")}
                    </Typography>
                    <MnemonicList mnemonic={mnemonic} />
                </Col>
            </Card>
            <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }} onPress={onClose}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default WalletMnemonicBackup;
