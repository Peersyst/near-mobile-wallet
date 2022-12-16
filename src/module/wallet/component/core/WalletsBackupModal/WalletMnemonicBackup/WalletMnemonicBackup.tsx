import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import { ActivityIndicator } from "react-native";
import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";

export interface WalletMnemonicBackupProps {
    onClose: () => void;
}

const WalletMnemonicBackup = ({ onClose }: WalletMnemonicBackupProps): JSX.Element => {
    const [mnemonic, setMnemonic] = useState<string[]>();
    const translate = useTranslate();

    useEffect(() => {
        const getStorageMnemonic = async () => {
            setMnemonic((await WalletStorage.getMnemonic())?.split(" "));
        };
        getStorageMnemonic();
    }, []);

    if (!mnemonic) return <ActivityIndicator size="large" />;
    return (
        <Col flex={1} gap={24} justifyContent="flex-end">
            <Advise title={translate("keep_this_safe")} />
            <MnemonicList mnemonic={mnemonic} />
            <Button fullWidth onPress={onClose}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default WalletMnemonicBackup;
