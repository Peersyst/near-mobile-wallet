import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import walletState from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Col, useDialog, useModal } from "react-native-components";
import { useResetRecoilState } from "recoil";
import ConfirmPinModal from "../components/core/ConfirmPinModal/ConfirmPinModal";
import UpdatePinModal from "../components/core/UpdatePinModal/UpdatePinModal";
import { SettingsStorage } from "module/settings/SettingsStorage";

const SecuritySettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    const resetWalletState = useResetRecoilState(walletState);
    const { showModal } = useModal();
    const { showDialog } = useDialog();
    const updatePin = () => {
        showModal(UpdatePinModal);
    };
    return (
        <BaseSecondaryScreen navigation={navigation} title={translate("security_settings")} back={true}>
            <Col gap={20}>
                <Button onPress={() => showModal(ConfirmPinModal, { onPinConfirmed: updatePin })} fullWidth variant="outlined">
                    {translate("change_passcode")}
                </Button>
                <Button
                    fullWidth
                    onPress={() =>
                        showDialog({
                            title: translate("delete_data"),
                            message: translate("delete_data_text"),
                            buttons: [
                                { text: translate("cancel") },
                                {
                                    text: translate("delete"),
                                    type: "destructive",
                                    onPress: () =>
                                        showModal(ConfirmPinModal, {
                                            onPinConfirmed: async () => {
                                                await WalletStorage.clear();
                                                await SettingsStorage.clear();
                                                resetWalletState();
                                            },
                                        }),
                                },
                            ],
                        })
                    }
                >
                    {translate("delete_data")}
                </Button>
            </Col>
        </BaseSecondaryScreen>
    );
};

export default SecuritySettingsScreen;
