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
        //Send transaction using the selected service instance
        try {
            const newService = await mutateAsync({ name: name! });
            if (!newService) return;
            //Set storage & set new service instance
            const newWallet = await WalletController.createNewWallet(name!, fundingAccount!, newService, network);
            if (!newWallet) return;
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
