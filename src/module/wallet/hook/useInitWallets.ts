import { NetworkType } from "module/settings/state/SettingsState";
import WalletController from "module/wallet/utils/WalletController";

export default function useInitWallets() {
    async function initWallets(network: NetworkType) {
        const mainPrivateKey = await WalletController.getMainPrivateKey();
        const { wallets } = await WalletController.importWallets(network, undefined, undefined, mainPrivateKey);
        return wallets;
    }
    return initWallets;
}
