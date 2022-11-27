import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { WalletStorage } from "module/wallet/WalletStorage";
import { serviceInstancesMap } from "module/wallet/state/ServiceInstance/ServiceInstance";
import { SettingsStorage } from "module/settings/SettingsStorage";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import { useDialog, useModal } from "@peersyst/react-native-components";
import { useQueryClient } from "react-query";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletState from "module/wallet/hook/useWalletState";

const DeleteData = () => {
    const translate = useTranslate();
    const { setState: setWalletState, reset: resetWalletState } = useWalletState();
    const queryClient = useQueryClient();
    const { showModal } = useModal();
    const { showDialog } = useDialog();

    const handleDelete = () => {
        showModal(ConfirmPinModal, {
            onPinConfirmed: async () => {
                await WalletStorage.clearAll();
                setWalletState((state) => ({ ...state, isAuthenticated: false, hasWallet: false }));
                serviceInstancesMap.clear();
                await SettingsStorage.clear();
                await queryClient.invalidateQueries();
                resetWalletState();
            },
        });
    };

    return (
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
                            onPress: handleDelete,
                        },
                    ],
                })
            }
        />
    );
};

export default DeleteData;
