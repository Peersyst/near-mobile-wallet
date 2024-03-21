import useTranslate from "module/common/hook/useTranslate";
import SettingsMenuItem from "../../navigation/SettingsMenuItem/SettingsMenuItem";
import { useModal } from "@peersyst/react-native-components";
import ManualAccountImportModal from "module/wallet/component/core/ManualAccountImportModal/ManualAccountImportModal";

const ManualAccountImport = (): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();

    return <SettingsMenuItem text={translate("importAccountManually")} onPress={() => showModal(ManualAccountImportModal)} />;
};

export default ManualAccountImport;
