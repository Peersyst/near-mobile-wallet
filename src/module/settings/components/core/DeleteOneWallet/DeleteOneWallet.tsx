import { translate } from "locale";
import SettingsMenuItem from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem";
import { useDialog, useModal } from "react-native-components";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { useRecoilState, useResetRecoilState } from "recoil";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { SettingsStorage } from "module/settings/SettingsStorage";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { useQueryClient } from "react-query";

const DeleteOneWallet = () => {
    const { showDialog } = useDialog();
    const { showModal } = useModal();
    const [{ wallets, selectedWallet }, setWalletState] = useRecoilState(walletState);
    const resetWalletState = useResetRecoilState(walletState);
    const queryClient = useQueryClient();

    const handleDelete = (index: number) => {
        const walletToDelete = wallets.find((w) => w.index === index);
        if (walletToDelete) {
            //Construct array without wallets[index]
            const filteredWallets = wallets.filter((w) => w.index !== index);
            const newWallets = filteredWallets.map((w) => (w.index > index ? { ...w, index: w.index - 1 } : w));

            showModal(ConfirmPinModal, {
                onPinConfirmed: async () => {
                    //If only 1 wallet erase all data
                    if (wallets.length === 1) {
                        await WalletStorage.clearAll();
                        serviceInstancesMap.clear();
                        await SettingsStorage.clear();
                        await queryClient.invalidateQueries();
                        resetWalletState();
                    } else {
                        //Remove wallet from storage
                        await WalletStorage.removeWallet(index);
                        //Remove wallet from state
                        setWalletState((state) => {
                            return {
                                ...state,
                                selectedWallet: selectedWallet === wallets.length - 1 ? selectedWallet - 1 : selectedWallet,
                                wallets: newWallets,
                            };
                        });
                        //Reorder serviceInstances and invalidate queries from the following wallets
                        const serviceInstancesSize = serviceInstancesMap.size;
                        const lastServiceInstanceIndex = serviceInstancesSize - 1;
                        for (let i = 0; i < serviceInstancesSize; i++) {
                            if (i > index) {
                                serviceInstancesMap.set(i - 1, serviceInstancesMap.get(i)!);
                                queryClient.invalidateQueries(["transactions", i - 1], { refetchInactive: true, exact: true });
                                queryClient.invalidateQueries(["tokens", i - 1], { refetchInactive: true, exact: true });
                                queryClient.invalidateQueries(["nfts", i - 1], { refetchInactive: true, exact: true });
                                queryClient.invalidateQueries(["balance", i - 1], { refetchInactive: true, exact: true });
                            }
                        }
                        //Delete last service instance and queries from last position
                        serviceInstancesMap.delete(serviceInstancesSize);
                        queryClient.removeQueries(["transactions", lastServiceInstanceIndex], { exact: true });
                        queryClient.removeQueries(["tokens", lastServiceInstanceIndex], { exact: true });
                        queryClient.removeQueries(["nfts", lastServiceInstanceIndex], { exact: true });
                        queryClient.removeQueries(["balance", lastServiceInstanceIndex], { exact: true });
                    }
                },
            });
        }
    };

    const handleWalletSelection = (index: number) => {
        const walletToDelete = wallets.find((w) => w.index === index);
        if (walletToDelete) {
            setTimeout(() => {
                showDialog({
                    title: translate("delete_wallet", { walletName: walletToDelete.name }),
                    message: translate(wallets.length === 1 ? "delete_only_wallet_text" : "delete_wallet_text", {
                        walletName: walletToDelete.name,
                    }),
                    buttons: [
                        { text: translate("cancel") },
                        {
                            text: translate("delete_wallet", { walletName: walletToDelete.name }),
                            type: "destructive",
                            onPress: () => handleDelete(index),
                        },
                    ],
                });
            }, 400);
        }
    };

    return (
        <WalletSelector
            display={<SettingsMenuItem destructive text={translate("delete_a_wallet")} />}
            onChange={(index) => handleWalletSelection(index as number)}
            value={-1}
        />
    );
};

export default DeleteOneWallet;
