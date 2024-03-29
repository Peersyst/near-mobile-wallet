import { NetworkType } from "module/settings/state/SettingsState";
import { useSetRecoilState } from "recoil";
import walletState, { Wallet } from "../state/WalletState";
import WalletController from "../utils/WalletController";
import useCreateWallet from "./useCreateWallet";

export default function useImportWallets() {
    const {
        state: { mnemonic, pin, privateKey, isBackupDone },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);

    const importWallets = async (network: NetworkType): Promise<Wallet[]> => {
        const parsedMnemonic = mnemonic?.join(" ");
        const { wallets } = await WalletController.importWallets(network, pin, parsedMnemonic, privateKey, isBackupDone);

        setWalletState((state) => {
            return {
                ...state,
                wallets: [...state.wallets, ...wallets],
                hasWallet: true,
                isAuthenticated: true,
                loading: false,
                isBackupDone,
            };
        });

        return wallets;
    };
    return importWallets;
}
