import { translate } from "locale";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { createBackdrop, ExposedBackdropProps, useToast } from "react-native-components";
import BaseSettingsModal from "../components/layout/BaseSettingsModal/BaseSettingsModal";

const UpdatePinScreen = createBackdrop(({ ...rest }: ExposedBackdropProps) => {
    const [open, setOpen] = useState<boolean>();
    const {
        state: { pin },
    } = useCreateWallet();
    const { showToast } = useToast();
    const handleSubmit = () => {
        console.log("hola")
        new Promise((resolve) => setTimeout(() => resolve(true), 2000));
        //Do something
        // const storedWallet = await WalletStorage.get();
        // await WalletStorage.set({ ...storedWallet!, pin: pin! });
        setOpen(false);
        showToast(translate("pin_updated_successfully"), { type: "success" });
    };
    return (
        <BaseSettingsModal open={open} title={translate("update_your_pin")} {...rest}>
            <SetWalletPinScreen updating onSuccess={handleSubmit} />
        </BaseSettingsModal>
    );
});

export default UpdatePinScreen;
