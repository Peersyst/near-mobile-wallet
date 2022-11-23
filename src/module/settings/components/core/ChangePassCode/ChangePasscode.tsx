import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import { useModal } from "@peersyst/react-native-components";
import UpdatePinModal from "module/settings/components/core/UpdatePinModal/UpdatePinModal";
import { useTranslate } from "module/common/hook/useTranslate";

const ChangePasscode = () => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const updatePin = () => {
        showModal(UpdatePinModal);
    };
    return (
        <SettingsMenuItem text={translate("change_passcode")} onPress={() => showModal(ConfirmPinModal, { onPinConfirmed: updatePin })} />
    );
};

export default ChangePasscode;
