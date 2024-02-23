import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { WalletStorage } from "module/wallet/WalletStorage";
import { serviceInstancesMap } from "module/wallet/state/ServiceInstances/ServiceInstances";
import { SettingsStorage } from "module/settings/SettingsStorage";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import { useQueryClient } from "react-query";
import useTranslate from "module/common/hook/useTranslate";
import useWalletState from "module/wallet/hook/useWalletState";
import useCancelableDialog from "module/common/hook/useCancelableDialog";
import { useState } from "react";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";

const DeleteData = () => {
    const translate = useTranslate();
    const { setState: setWalletState, reset: resetWalletState } = useWalletState();
    const queryClient = useQueryClient();
    const { showCancelableDialog, hideCancelableDialog } = useCancelableDialog();
    const [openConfirmPin, setOpenConfirmPin] = useState(false);

    const handleDelete = () => {
        setOpenConfirmPin(true);
        hideCancelableDialog();
    };

    const handlePinConfirmed = async () => {
        hideCancelableDialog();
        await WalletStorage.clearAll();
        setWalletState((state) => ({ ...state, hasWallet: false }));
        serviceInstancesMap.clear();
        await SettingsStorage.clear();
        queryClient.removeQueries();
        resetWalletState();
        // <<< refactor
        await ControllerFactory.authController.logout();
        // refactor >>>
    };

    return (
        <>
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
            <ConfirmPinModal open={openConfirmPin} onClose={() => setOpenConfirmPin(false)} onPinConfirmed={handlePinConfirmed} />
        </>
    );
};

export default DeleteData;
