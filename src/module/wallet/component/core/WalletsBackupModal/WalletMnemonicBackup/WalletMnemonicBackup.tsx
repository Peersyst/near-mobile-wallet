import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import { ActivityIndicator } from "react-native";
import { Col, Typography, useToast } from "react-native-components";
import Button from "module/common/component/input/Button/Button";
import { translate } from "locale";
import Card from "module/common/component/surface/Card/Card";
import MnemonicPicker from "module/wallet/component/input/MnemonicPicker/MnemonicPicker";

export interface WalletMnemonicBackupProps {
    walletIndex: number;
    onSuccess: () => void;
}

const WalletMnemonicBackup = ({ walletIndex, onSuccess }: WalletMnemonicBackupProps): JSX.Element => {
    const [mnemonic, setMnemonic] = useState<string[]>();
    const [pickMnemonic, setPickMnemonic] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        const getStorageMnemonic = async () => {
            setMnemonic(await WalletStorage.getMnemonic(walletIndex));
        };
        getStorageMnemonic();
    }, [walletIndex]);

    if (!mnemonic) return <ActivityIndicator size="large" />;
    else if (!pickMnemonic)
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
                <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }} onPress={() => setPickMnemonic(true)}>
                    {translate("next")}
                </Button>
            </Col>
        );
    else
        return (
            <Card style={{ flex: 1 }}>
                <Col gap={30}>
                    <Typography variant="h3" fontWeight="bold" textTransform="uppercase" textAlign="center">
                        {translate("select_in_order")}
                    </Typography>
                    <MnemonicPicker
                        mnemonic={mnemonic}
                        onSuccess={onSuccess}
                        onError={() => showToast(translate("incorrect_mnemonic"), { type: "error" })}
                    />
                </Col>
            </Card>
        );
};

export default WalletMnemonicBackup;
