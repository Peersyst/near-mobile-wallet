import { NetworkType } from "module/settings/state/SettingsState";
import { useSetRecoilState } from "recoil";
import ServiceInstance from "../state/ServiceInstance/ServiceInstance";
import walletState, { Wallet } from "../state/WalletState";
import { getWallet } from "../utils/wallet.utils";
import { StorageWallet, SecureWalletInfo } from "../wallet.types";
import { WalletStorage } from "../WalletStorage";

export default function useRecoverWallets() {
    const setWalletState = useSetRecoilState(walletState);

    /**
     * recoverWallets is in charge of:
     * - Recover wallets from the storage
     * - Check if there are new accounts created outside the app
     * - Set the wallets into the state
     * - Set the new wallets into the storage (secure + unsecure)
     * @param network
     * @param walletGroups - Wallets grouped by privateKeys.
     * @param oldStorageWallets - Wallets from the storage.
     */
    const recoverWallets = async (network: NetworkType, oldStorageWallets: StorageWallet[], walletGroups: SecureWalletInfo[]) => {
        const wallets: Wallet[] = []; //Wallets to be added to the state
        const newStorageWallets: StorageWallet[] = [...oldStorageWallets]; //Wallets to be added to the storage
        const newSecureWallets: SecureWalletInfo[] = [...walletGroups]; //Wallets to be added to the secure storage
        let updateSecure = false;

        for (const [index, walletGroup] of walletGroups.entries()) {
            const accounts = await ServiceInstance.addServiceInstances({
                network: network,
                privateKey: walletGroup.privateKey,
            });
            const tempWallets: Wallet[] = [];
            const tempStorageWallets: StorageWallet[] = [];

            for (const walletId of walletGroup.walletIds) {
                const wallet = getWallet(walletId, oldStorageWallets);
                if (wallet) {
                    tempWallets.push(wallet);
                } else {
                    console.warn("Corrupted storage: Wallet not found. WalletId: ", walletId);
                }
            }
            //New accounts created outside the app
            if (walletGroup.walletIds.length !== accounts.length) {
                const newAccounts = accounts.filter(({ account }) => !tempWallets.find((w) => w.account === account));
                for (const { account } of newAccounts) {
                    const wallet: Wallet = {
                        colorIndex: 0,
                        account,
                    };
                    const newIndex = wallets.length + tempWallets.length;
                    tempWallets.push(wallet);
                    tempStorageWallets.push({ ...wallet, index: newIndex });
                    newSecureWallets[index].walletIds = [...walletGroup.walletIds, newIndex];
                }
            }
            wallets.push(...tempWallets);
            newStorageWallets.push(...tempStorageWallets);
        }

        //Update the storage
        if (updateSecure) {
            await WalletStorage.setSecureWallets(newSecureWallets, network);
        }
        if (newStorageWallets.length !== oldStorageWallets.length) {
            await WalletStorage.setUnencryptedWallets(newStorageWallets, network);
        }

        setWalletState((state) => ({
            ...state,
            hasWallet: true,
            wallets: wallets,
        }));
    };
    return recoverWallets;
}
