import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import walletState from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Col, useModal } from "react-native-components";
import { useSetRecoilState } from "recoil";
import ConfirmPinScreen from "./ConfirmPinScreen";
import UpdatePinScreen from "./UpdatePinScreen";

const SecuritySettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    const { showModal } = useModal();
    const handlePinConfirmed = () => {
        console.log("hola Mundo")
    };
    return (
        <BaseSecondaryScreen navigation={navigation} title={translate("security_settings")} back={true}>
            <Col gap={20}>
                <Button onPress={() => showModal(ConfirmPinScreen, { onPinConfirmed: handlePinConfirmed })} fullWidth variant="outlined">
                    {translate("change_passcode")}
                </Button>
                <Button
                    fullWidth
                    style={{ backgroundColor: "red" }}
                    onPress={async () => {
                        await WalletStorage.clear();
                        setWalletState((state) => ({
                            ...state,
                            isAuthenticated: false,
                            hasWallet: false,
                            name: undefined,
                            selectedAccount: undefined,
                        }));
                    }}
                >
                    DELETE ACCOUNT
                </Button>
            </Col>
        </BaseSecondaryScreen>
    );
};

export default SecuritySettingsScreen;
