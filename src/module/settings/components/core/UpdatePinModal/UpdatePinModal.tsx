import { translate } from "locale";
import RepeatNumericPad from "module/common/component/input/RepeatNumericPad/RepeatNumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { createBackdrop, ExposedBackdropProps, useToast } from "react-native-components";
import BaseSettingsModal from "../../layout/BaseSettingsModal/BaseSettingsModal";

const UpdatePinModal = createBackdrop(
    ({ ...rest }: Omit<ExposedBackdropProps, "animationIn" | "animationOut" | "animationInTiming" | "animationOutTiming">) => {
        const [open, setOpen] = useState<boolean>();
        const { showToast } = useToast();

        const handleSubmit = async (pin: string) => {
            setOpen(false);
            await WalletStorage.setPin(pin);
            showToast(translate("pin_updated_successfully"), { type: "success" });
        };

        return (
            <BaseSettingsModal open={open} title={translate("update_your_pin")} {...rest}>
                <RepeatNumericPad placeholder={translate("enter_new_pin")} onSuccess={(pin) => handleSubmit(pin)} />
            </BaseSettingsModal>
        );
    },
);

export default UpdatePinModal;
