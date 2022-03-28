import { translate } from "locale";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { createBackdrop, ExposedBackdropProps } from "react-native-components";
import BaseSettingsModal from "../components/layout/BaseSettingsModal/BaseSettingsModal";

const UpdatePinScreen = createBackdrop(({ ...rest }: ExposedBackdropProps) => {
    const handleSubmit = () => {
        //Pin sucessfully updated
        // const {
        //     state: { pin },
        // } = useCreateWallet();
        // const [pinConfirmed, setPinConfirmedState] = useRecoilState(pinConfirmedState);
        // const { showToast } = useToast();
        // useEffect(() => {
        //     const updatePin = async () => {
        //         const storedWallet = await WalletStorage.get();
        //         await WalletStorage.set({ ...storedWallet!, pin: pin! });
        //         setPinConfirmedState({ pinConfirmed: false, hasNewPin: false });
        //         showToast(translate("pin_updated_successfully"), { type: "success" });
        //     };
        //     if (pinConfirmed.pinConfirmed && pinConfirmed.hasNewPin) updatePin();
        // }, [pinConfirmed]);
    };
    return (
        <BaseSettingsModal title={translate("update_your_pin")} {...rest}>
            <SetWalletPinScreen updating onSuccess={handleSubmit} />
        </BaseSettingsModal>
    );
});

export default UpdatePinScreen;
