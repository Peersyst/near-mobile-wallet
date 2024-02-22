import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { WalletStorage } from "module/wallet/WalletStorage";
import { serviceInstancesMap } from "module/wallet/state/ServiceInstances/ServiceInstances";
import { SettingsStorage } from "module/settings/SettingsStorage";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import { useModal } from "@peersyst/react-native-components";
import { useQueryClient } from "react-query";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletState from "module/wallet/hook/useWalletState";
import useCancelableDialog from "module/common/hook/useCancelableDialog";

const DeleteData = () => {
    const translate = useTranslate();
    const { setState: setWalletState, reset: resetWalletState } = useWalletState();
    const queryClient = useQueryClient();
    const { showModal } = useModal();
    const { showCancelableDialog } = useCancelableDialog();

    const handleDelete = () => {
        showModal(ConfirmPinModal, {
            onPinConfirmed: async () => {
                await WalletStorage.clearAll();
                setWalletState((state) => ({ ...state, isAuthenticated: false, hasWallet: false }));
                serviceInstancesMap.clear();
                await SettingsStorage.clear();
                queryClient.removeQueries();
                resetWalletState();
            },
        });
    };

    return (
        <SettingsMenuItem
            destructive
            text={translate("delete_data")}
            onPress={() =>
                showCancelableDialog({
                    title: translate("delete_data"),
                    content: translate("delete_data_text")!,
                    buttons: [
                        {
                            text: translate("delete"),
                            type: "destructive",
                            action: handleDelete,
                        },
                    ],
                })
            }
        />
    );
};

export default DeleteData;
