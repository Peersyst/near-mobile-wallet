import { useToast } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { NetworkType } from "module/settings/state/SettingsState";
import { Chains } from "near-peersyst-sdk";
import { useSetRecoilState } from "recoil";
import walletState, { Wallet } from "../state/WalletState";
import WalletController from "../utils/WalletController";
import useCreateWallet from "./useCreateWallet";

export default function useImportWallets() {
    const {
        state: { mnemonic, pin, privateKey },
    } = useCreateWallet();
    const setWalletState = useSetRecoilState(walletState);
    const { showToast } = useToast();
    const translateError = useTranslate("error");

    const importWallets = async (network: NetworkType): Promise<Wallet[]> => {
        const parsedMnemonic = mnemonic?.join(" ");
        const { wallets } = await WalletController.importWallets(network, pin, parsedMnemonic, privateKey);
        if (pin && parsedMnemonic) {
            const newNetwork: NetworkType = network === Chains.TESTNET ? Chains.MAINNET : Chains.TESTNET;
            await WalletController.importWallets(newNetwork, pin, parsedMnemonic);
        }

        if (wallets.length > 0) {
            setWalletState((state) => {
                return {
                    ...state,
                    wallets: [...state.wallets, ...wallets],
                    hasWallet: true,
                    isAuthenticated: true,
                };
            });
        } else {
            const localeKey = (parsedMnemonic ? "mnemonic" : "private_key") + "_already_exists";
            setTimeout(() => {
                showToast(translateError(localeKey));
            }, 1000);
        }
        return wallets;
    };
    return importWallets;
}
