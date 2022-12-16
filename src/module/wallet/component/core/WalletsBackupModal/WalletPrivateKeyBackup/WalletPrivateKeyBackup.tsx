import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import WalletBackupBaseDisplay from "../WalletBackupBaseDisplayScreen/WalletBackupBaseDisplayScreen";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import BlockchainAddressCard from "module/wallet/component/input/BlockchainAddressCard/BlockchainAddressCard";
import { useTranslate } from "module/common/hook/useTranslate";

export interface WalletPrivateKeyBackupProps {
    onClose: () => void;
}

const WalletPrivateKeyBackup = ({ onClose }: WalletPrivateKeyBackupProps): JSX.Element => {
    const [privateKey, setPrivateKey] = useState<string>();
    const { network } = useRecoilValue(settingsState);
    const { walletIndex } = useRecoilValue(backupWalletState);
    const translate = useTranslate();
    useEffect(() => {
        const getStoragePrivateKey = async () => {
            setPrivateKey(await WalletStorage.getWalletPrivateKey(walletIndex!, network));
        };
        getStoragePrivateKey();
    }, []);

    return (
        <WalletBackupBaseDisplay onClose={onClose} loading={!privateKey}>
            <BlockchainAddressCard address={privateKey!} withCopyIcon toastMessage={translate("private_key_copied")} />
        </WalletBackupBaseDisplay>
    );
};

export default WalletPrivateKeyBackup;
