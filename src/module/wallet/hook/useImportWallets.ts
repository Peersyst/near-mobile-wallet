import { useToast } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { NetworkType } from "module/settings/state/SettingsState";
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
    const translate = useTranslate();
    const translateError = useTranslate("error");

    const importWallets = async (network: NetworkType): Promise<Wallet[]> => {
        const parsedMnemonic = mnemonic?.join(" ");
        const { wallets } = await WalletController.importWallets(network, pin, parsedMnemonic, privateKey);
        if (wallets.length > 0) {
            setWalletState((state) => {
                return {
                    ...state,
                    wallets: wallets,
                    hasWallet: true,
                    isAuthenticated: true,
                };
            });
        } else {
            const secret = parsedMnemonic || translate("private_key");
            showToast(translateError("secret_key_already_exists", { secret }), { type: "warning" });
        }
        return wallets;
    };
    return importWallets;
}
