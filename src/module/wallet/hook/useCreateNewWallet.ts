import { config } from "config";
import { NetworkType } from "module/settings/state/SettingsState";
import { Wallet } from "../state/WalletState";
import WalletController from "../utils/WalletController";
import useCreateWallet from "./useCreateWallet";
import useServiceInstance from "./useServiceInstance";
import useWalletState from "./useWalletState";

export default function useCreateNewWallet() {
    const {
        state: { fundingAccount, name },
    } = useCreateWallet();

    const { setState: setWalletState } = useWalletState();

    const { serviceInstance } = useServiceInstance(fundingAccount);

    const createWallet = async (network: NetworkType): Promise<Wallet | undefined> => {
        //Send transaction using the selected service instance
        const newService = await serviceInstance.createNewAccountWithSameSecretKey(name!, config.minBalanceToCreateAccount);
        if (!newService) return;
        /**
         * Save new account:
         * - Set the new account in the wallet state
         * - Set the new account with its pK in the storage
         * - Set a new service instance with the new account
         */

        const newWallet = await WalletController.createNewWallet(name!, fundingAccount!, newService, network);
        if (!newWallet) return;
        setWalletState((state) => {
            return {
                ...state,
                wallets: [...state.wallets, newWallet],
            };
        });
        return newWallet;
    };

    return createWallet;
}
