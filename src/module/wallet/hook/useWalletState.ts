import { SetterOrUpdater, useRecoilState, useResetRecoilState } from "recoil";
import walletState, { Wallet, WalletState } from "module/wallet/state/WalletState";

export interface UseWalletResult {
    state: WalletState;
    setState: SetterOrUpdater<WalletState>;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setWallets: (wallets: Wallet[]) => void;
    setSelectedWallet: (account: number) => void;
    reset: () => void;
}

const useWalletState = (): UseWalletResult => {
    const [state, setState] = useRecoilState(walletState);
    const reset = useResetRecoilState(walletState);

    return {
        state,
        setState,
        setAuthenticated: (isAuthenticated: boolean) => setState((s) => ({ ...s, isAuthenticated })),
        setWallets: (wallets: Wallet[]) => setState((s) => ({ ...s, wallets })),
        setSelectedWallet: (selectedWallet: number) => setState((s) => ({ ...s, selectedWallet })),
        reset,
    };
};

export default useWalletState;
