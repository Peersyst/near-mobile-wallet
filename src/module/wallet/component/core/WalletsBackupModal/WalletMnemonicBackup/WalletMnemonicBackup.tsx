import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import WalletBackupBaseDisplay from "../WalletBackupBaseDisplayScreen/WalletBackupBaseDisplayScreen";
import useWalletState from "module/wallet/hook/useWalletState";

export interface WalletMnemonicBackupProps {
    onClose: () => void;
}

const WalletMnemonicBackup = ({ onClose }: WalletMnemonicBackupProps): JSX.Element => {
    const [mnemonic, setMnemonic] = useState<string[]>();
    const {
        state: { isBackupDone },
        setState,
    } = useWalletState();
    useEffect(() => {
        const getStorageMnemonic = async () => {
            setMnemonic((await WalletStorage.getMnemonic())?.split(" "));
            if (!isBackupDone) {
                setState((s) => ({ ...s, isBackupDone: true }));
                WalletStorage.setIsBackupDone(true);
            }
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
