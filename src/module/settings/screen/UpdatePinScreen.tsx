import { translate } from "locale";
import RepeatNumericPad from "module/common/component/input/RepeatNumericPad/RepeatNumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { createBackdrop, ExposedBackdropProps, useToast } from "react-native-components";
import BaseSettingsModal from "../components/layout/BaseSettingsModal/BaseSettingsModal";

const UpdatePinScreen = createBackdrop(({ ...rest }: ExposedBackdropProps) => {
    const [open, setOpen] = useState<boolean>();
    const { showToast } = useToast();

    const handleSubmit = async (pin: string) => {
        setOpen(false);
        const storedWallet = await WalletStorage.get();
        await WalletStorage.set({ ...storedWallet!, pin: pin });
        showToast(translate("pin_updated_successfully"), { type: "success" });
    };

    return (
        <BaseSettingsModal open={open} title={translate("update_your_pin")} {...rest}>
            <RepeatNumericPad placeholder={translate("enter_new_pin")} onSuccess={(pin) => handleSubmit(pin)} />
        </BaseSettingsModal>
    );
});

export default UpdatePinScreen;
