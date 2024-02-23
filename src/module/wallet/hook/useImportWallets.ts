import { useSetRecoilState } from "recoil";
import walletState, { Wallet } from "../state/WalletState";
import WalletController from "../utils/WalletController";
import useCreateWallet from "./useCreateWallet";
import { NetworkType } from "module/common/types";

export default function useImportWallets() {
    const {
        state: { mnemonic, pin, privateKey },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);

    const importWallets = async (network: NetworkType): Promise<Wallet[]> => {
        const parsedMnemonic = mnemonic?.join(" ");
        const { wallets } = await WalletController.importWallets(network, pin, parsedMnemonic, privateKey);

        setWalletState((state) => {
            return {
                ...state,
                wallets: [...state.wallets, ...wallets],
                hasWallet: true,
                loading: false,
            };
        });

        return wallets;
    };
    return importWallets;
}
