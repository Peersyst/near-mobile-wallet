import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import WalletBackupBaseDisplay from "../WalletBackupBaseDisplayScreen/WalletBackupBaseDisplayScreen";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import BlockchainAddressCard from "module/wallet/component/input/BlockchainAddressCard/BlockchainAddressCard";
import useWalletState from "module/wallet/hook/useWalletState";

export interface WalletPrivateKeyBackupProps {
    onClose: () => void;
}

const WalletPrivateKeyBackup = ({ onClose }: WalletPrivateKeyBackupProps): JSX.Element => {
    const [privateKey, setPrivateKey] = useState<string>();
    const { network } = useRecoilValue(settingsState);
    const { walletIndex } = useRecoilValue(backupWalletState);
    const {
        state: { isBackupDone },
        setState,
    } = useWalletState();

    useEffect(() => {
        const getStoragePrivateKey = async () => {
            setPrivateKey(await WalletStorage.getWalletPrivateKey(walletIndex!, network));
            if (!isBackupDone) {
                setState((s) => ({ ...s, isBackupDone: true }));
                WalletStorage.setIsBackupDone(true);
            }
        };
        getStoragePrivateKey();
    }, []);

    return (
        <WalletBackupBaseDisplay onClose={onClose} loading={!privateKey}>
            <BlockchainAddressCard address={privateKey!} showCopyIcon />
        </WalletBackupBaseDisplay>
    );
};

export default WalletPrivateKeyBackup;
