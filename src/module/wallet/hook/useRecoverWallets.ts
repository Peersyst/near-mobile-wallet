import { NetworkType } from "module/settings/state/SettingsState";
import { useSetRecoilState } from "recoil";
import walletState from "../state/WalletState";
import WalletController from "../utils/WalletController";
import { WalletStorage } from "../WalletStorage";

export default function useRecoverWallets() {
    const setWalletState = useSetRecoilState(walletState);

    const recoverWallets = async (network: NetworkType): Promise<boolean> => {
        //Info about the wallets (that is set into the state)
        const oldStorageWallets = await WalletStorage.getWallets(network);
        //Has all the privateKeys and walletIds that point into the oldStorageWallets
        const walletGroups = await WalletStorage.getSecureWallets(network);

        if (oldStorageWallets.length === 0 || walletGroups.length === 0) return false;

        const { wallets, newStorageWallets, newSecureWallets, updateSecure } = await WalletController.recoverWallets(
            network,
            oldStorageWallets,
            walletGroups,
        );

        //Update the storage
        if (updateSecure) await WalletStorage.setSecureWallets(newSecureWallets, network);
        if (newStorageWallets.length !== oldStorageWallets.length) await WalletStorage.setUnencryptedWallets(newStorageWallets, network);

        setWalletState((state) => ({
            ...state,
            hasWallet: true,
            wallets: wallets,
        }));
        return true;
    };
    return recoverWallets;
}
