import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";
import { Typography, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Alert from "module/common/component/feedback/Alert/Alert";
import SettingsMenuItemWithAlert from "../../navigation/SettingsMenuItemWithAlert/SettingsMenuItemWithAlert";
import useIsBackupDone from "module/settings/hook/useIsBackupDone";

const WalletsBackup = () => {
    const { showModal } = useModal();
    const translate = useTranslate();
    const isBackupDone = useIsBackupDone();
    return (
        <SettingsMenuItemWithAlert text={translate("back_up_your_accounts")} onPress={() => showModal(WalletsBackupModal)}>
            <>
                {!isBackupDone && (
                    <Alert type="error" content={<Typography variant="body3Regular">{translate("notBackup")}</Typography>}></Alert>
                )}
            </>
        </SettingsMenuItemWithAlert>
    );
};

export default WalletsBackup;
