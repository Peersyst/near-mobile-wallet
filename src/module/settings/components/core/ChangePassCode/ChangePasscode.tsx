import { translate } from "locale";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import { useModal } from "react-native-components";
import UpdatePinModal from "module/settings/components/core/UpdatePinModal/UpdatePinModal";

const ChangePasscode = () => {
    const { showModal } = useModal();
    const updatePin = () => {
        showModal(UpdatePinModal);
    };
    return (
        <SettingsMenuItem text={translate("change_passcode")} onPress={() => showModal(ConfirmPinModal, { onPinConfirmed: updatePin })} />
    );
};

export default ChangePasscode;
