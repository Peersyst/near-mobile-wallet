import { NetworkType } from "module/settings/state/SettingsState";
import { useSetRecoilState } from "recoil";
import walletState from "../state/WalletState";
import WalletController from "../utils/WalletController";

export default function useRecoverWallets() {
    const setWalletState = useSetRecoilState(walletState);
    const recoverWallets = async (network: NetworkType): Promise<boolean> => {
        const { wallets, hasWallets } = await WalletController.recoverWallets(network);
        if (hasWallets) {
            setWalletState((state) => ({
                ...state,
                hasWallet: true,
                wallets: wallets,
            }));
        }
        return hasWallets;
    };
    return recoverWallets;
}
