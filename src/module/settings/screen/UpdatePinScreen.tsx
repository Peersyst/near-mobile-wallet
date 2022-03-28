import { translate } from "locale";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { createBackdrop, ExposedBackdropProps } from "react-native-components";
import BaseSettingsModal from "../components/layout/BaseSettingsModal/BaseSettingsModal";

const UpdatePinScreen = createBackdrop(({ ...rest }: ExposedBackdropProps) => {
    const handleSubmit = () => {
      
    };
    return (
        <BaseSettingsModal title={translate("update_your_pin")} {...rest}>
            <SetWalletPinScreen updating onSuccess={handleSubmit} />
        </BaseSettingsModal>
    );
});

export default UpdatePinScreen;
