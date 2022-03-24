import { translate } from "locale";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { createBackdrop, ExposedBackdropProps } from "react-native-components";
import BaseSettingsModal from "../components/layout/BaseSettingsModal/BaseSettingsModal";

const UpdatePinScreen = createBackdrop((props: ExposedBackdropProps) => {
    const handleSubmit = () => {
        //Pin sucessfully updated
    };
    return (
        <BaseSettingsModal title={translate("update_your_pin")} {...props}>
            <SetWalletPinScreen updating onSuccess={handleSubmit} />
        </BaseSettingsModal>
    );
});

export default UpdatePinScreen;
