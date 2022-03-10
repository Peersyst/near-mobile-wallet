import { SetterOrUpdater, useRecoilState, useResetRecoilState } from "recoil";
import walletState, { Cell, WalletState } from "module/wallet/state/WalletState";

export interface UseWalletResult {
    state: WalletState;
    setState: SetterOrUpdater<WalletState>;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setCells: (cells: Cell[]) => void;
    setSelectedAccount: (account: number) => void;
    reset: () => void;
}

const useWallet = (): UseWalletResult => {
    const [state, setState] = useRecoilState(walletState);
    const reset = useResetRecoilState(walletState);

    return {
        state,
        setState,
        setAuthenticated: (isAuthenticated: boolean) => setState((s) => ({ ...s, isAuthenticated })),
        setCells: (cells: Cell[]) => setState((s) => ({ ...s, cells })),
        setSelectedAccount: (selectedAccount: number) => setState((s) => ({ ...s, selectedAccount })),
        reset,
    };
};

export default useWallet;
