import { translate } from "locale";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Col, useDialog, useModal } from "react-native-components";
import { useResetRecoilState } from "recoil";
import ConfirmPinModal from "../components/core/ConfirmPinModal/ConfirmPinModal";
import UpdatePinModal from "../components/core/UpdatePinModal/UpdatePinModal";
import { SettingsStorage } from "module/settings/SettingsStorage";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";

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
                <SettingsMenuItem
                    text={translate("change_passcode")}
                    onPress={() => showModal(ConfirmPinModal, { onPinConfirmed: updatePin })}
                />
                <SettingsMenuItem text={translate("back_up_your_wallets")} onPress={() => showModal(WalletsBackupModal)} />
                <SettingsMenuItem
                    destructive
                    text={translate("delete_data")}
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
                                                serviceInstancesMap.clear();
                                                await SettingsStorage.clear();
                                                resetWalletState();
                                            },
                                        }),
                                },
                            ],
                        })
                    }
                />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default SecuritySettingsScreen;
