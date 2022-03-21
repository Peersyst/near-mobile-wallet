import useNavigation from "module/common/hook/useNavigation";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import { MainScreens } from "module/main/MainNavigatorGroup";
import pinConfirmedState from "module/settings/state/PinConfirmedState";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { Row, Col } from "react-native-components";
import { useSetRecoilState } from "recoil";
import BaseSettingsModalScreen from "../components/layout/BaseSettingsModalScreen/BaseSettingsModalScreen";

const UpdatePinScreen = (): JSX.Element => {
    const setPinConfirmedState = useSetRecoilState(pinConfirmedState);
    const navigation = useNavigation();
    const handleSubmit = () => {
        setPinConfirmedState((state) =>({...state, hasNewPin: true}))
        navigation.navigate(MainBottomScreens.SECURITY_SETTINGS);
    };
    return (
        <BaseSettingsModalScreen title="Update your PIN" back>
            <Row style={{ flex: 1, alignItems: "center" }}>
                <Col style={{ flex: 1, maxHeight: 525 }}>
                    <SetWalletPinScreen updating onSuccess={handleSubmit} />
                </Col>
            </Row>
        </BaseSettingsModalScreen>
    );
};

export default UpdatePinScreen;
