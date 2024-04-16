import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";
import { Typography, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Alert from "module/common/component/feedback/Alert/Alert";
import useIsBackupDone from "module/settings/hook/useIsBackupDone";
import SettingsMenuItem from "../../navigation/SettingsMenuItem/SettingsMenuItem";

const WalletsBackup = () => {
    const { showModal } = useModal();
    const translate = useTranslate();
    const isBackupDone = useIsBackupDone();

    return (
        <SettingsMenuItem text={translate("back_up_your_accounts")} onPress={() => showModal(WalletsBackupModal)}>
            {!isBackupDone ? (
                <Alert type="error" content={<Typography variant="body3Regular">{translate("youHaveNotDoneBackupYet")}</Typography>} />
            ) : null}
        </SettingsMenuItem>
    );
};

export default WalletsBackup;
