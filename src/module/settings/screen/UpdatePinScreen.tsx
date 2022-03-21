import useNavigation from "module/common/hook/useNavigation";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import pinConfirmedState from "module/settings/state/PinConfirmedState";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { Col } from "react-native-components";
import { useSetRecoilState } from "recoil";
import BaseSettingsModalScreen from "../components/layout/BaseSettingsModalScreen/BaseSettingsModalScreen";

const UpdatePinScreen = (): JSX.Element => {
    const setPinConfirmedState = useSetRecoilState(pinConfirmedState);
    const navigation = useNavigation();
    const handleSubmit = () => {
        setPinConfirmedState((state) => ({ ...state, hasNewPin: true }));
        navigation.navigate(MainBottomScreens.SECURITY_SETTINGS);
    };
    return (
        <BaseSettingsModalScreen title="Update your PIN" back>
            <Col style={{ maxHeight: 500 }}>
                <SetWalletPinScreen updating onSuccess={handleSubmit} />
            </Col>
        </BaseSettingsModalScreen>
    );
};

export default UpdatePinScreen;
