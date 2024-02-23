import { useSetRecoilState } from "recoil";
import walletState from "../state/WalletState";
import WalletController from "../utils/WalletController";
import { NetworkType } from "module/common/types";

export default function useRecoverWallets() {
    const setWalletState = useSetRecoilState(walletState);
    const recoverWallets = async (network: NetworkType): Promise<boolean> => {
        const { wallets } = await WalletController.recoverWallets(network);
        const hasWallets = wallets.length !== 0;

        setWalletState((state) => ({
            ...state,
            loading: false,
            selectedWallet: 0,
            hasWallet: true,
            wallets: wallets,
        }));

        return hasWallets;
    };
    return recoverWallets;
}
