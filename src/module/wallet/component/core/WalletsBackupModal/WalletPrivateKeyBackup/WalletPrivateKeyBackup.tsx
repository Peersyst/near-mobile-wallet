import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import WalletBackupBaseDisplay from "../WalletBackupBaseDisplayScreen/WalletBackupBaseDisplayScreen";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import Container from "module/common/component/display/Container/Container";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import Typography from "module/common/component/display/Typography/Typography";
import BlockchainAddressCard from "module/wallet/component/input/BlockchainAddressCard/BlockchainAddressCard";

export interface WalletPrivateKeyBackupProps {
    onClose: () => void;
}

const WalletPrivateKeyBackup = ({ onClose }: WalletPrivateKeyBackupProps): JSX.Element => {
    const [privateKey, setPrivateKey] = useState<string>();
    const { network } = useRecoilValue(settingsState);
    const { walletIndex } = useRecoilValue(backupWalletState);

    useEffect(() => {
        const getStoragePrivateKey = async () => {
            setPrivateKey(await WalletStorage.getWalletPrivateKey(walletIndex!, network));
        };
        getStoragePrivateKey();
    }, []);

    return (
        <WalletBackupBaseDisplay onClose={onClose} loading={!privateKey}>
            <BlockchainAddressCard address={privateKey!} onCopy={onClose} />
        </WalletBackupBaseDisplay>
    );
};

export default WalletPrivateKeyBackup;
