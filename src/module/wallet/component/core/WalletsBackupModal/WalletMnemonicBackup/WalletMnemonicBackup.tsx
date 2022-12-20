import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import WalletBackupBaseDisplay from "../WalletBackupBaseDisplayScreen/WalletBackupBaseDisplayScreen";

export interface WalletMnemonicBackupProps {
    onClose: () => void;
}

const WalletMnemonicBackup = ({ onClose }: WalletMnemonicBackupProps): JSX.Element => {
    const [mnemonic, setMnemonic] = useState<string[]>();

    useEffect(() => {
        const getStorageMnemonic = async () => {
            setMnemonic((await WalletStorage.getMnemonic())?.split(" "));
        };
        getStorageMnemonic();
    }, []);

    return (
        <WalletBackupBaseDisplay onClose={onClose} loading={!mnemonic}>
            <MnemonicList mnemonic={mnemonic ?? []} />
        </WalletBackupBaseDisplay>
    );
};

export default WalletMnemonicBackup;
