import { translate } from "locale";
import useNavigation from "module/common/hook/useNavigation";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import pinConfirmedState from "module/settings/state/PinConfirmedState";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { useSetRecoilState } from "recoil";
import BaseSettingsModalScreen from "../components/layout/BaseSettingsModalScreen/BaseSettingsModalScreen";

const UpdatePinScreen = () => {
    const setPinConfirmedState = useSetRecoilState(pinConfirmedState);
    const navigation = useNavigation();
    const handleSubmit = () => {
        setPinConfirmedState((state) => ({ ...state, hasNewPin: true }));
        navigation.navigate(MainBottomScreens.SECURITY_SETTINGS);
    };
    return (
        <BaseSettingsModalScreen title={translate("update_your_pin")} >
            <SetWalletPinScreen updating onSuccess={handleSubmit} />
        </BaseSettingsModalScreen>
    );
};

export default UpdatePinScreen;
