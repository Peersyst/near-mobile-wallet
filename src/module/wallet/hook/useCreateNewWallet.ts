import { NetworkType } from "module/settings/state/SettingsState";
import useCreateAccount from "../query/useCreateAccount";
import { Wallet } from "../state/WalletState";
import WalletController from "../utils/WalletController";
import useCreateWallet from "./useCreateWallet";
import useWalletState from "./useWalletState";

export default function useCreateNewWallet() {
    const {
        state: { fundingAccount, name },
    } = useCreateWallet();

    const { setState: setWalletState } = useWalletState();
    const { mutateAsync } = useCreateAccount(fundingAccount!);

    const createWallet = async (network: NetworkType): Promise<Wallet | undefined> => {
        try {
            //Send transaction using the selected service instance
            //This will create a new service instance and will pay for the transaction
            const newService = await mutateAsync({ name: name! });
            if (!newService) return;

            //Add service to ServiceInstanceMap and wallet to the storage
            const newWallet = await WalletController.createNewWallet(name!, fundingAccount!, newService, network);
            if (!newWallet) return;

            //Add new wallet to the wallet state
            setWalletState((state) => ({
                ...state,
                wallets: [...state.wallets, newWallet],
            }));

            return newWallet;
        } catch (e) {
            return;
        }
    };

    return createWallet;
}
