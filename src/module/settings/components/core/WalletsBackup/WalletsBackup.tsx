import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import { useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import useWalletState from "module/wallet/hook/useWalletState";

const WalletsBackup = () => {
    const { showModal } = useModal();
    const translate = useTranslate();
    const {
        state: { isBackupDone },
    } = useWalletState();

    console.log("isBackupDone", isBackupDone);
    return <SettingsMenuItem text={translate("back_up_your_accounts")} onPress={() => showModal(WalletsBackupModal)} />;
};

export default WalletsBackup;
