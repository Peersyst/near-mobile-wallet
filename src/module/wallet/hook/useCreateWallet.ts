import { useRecoilState } from "recoil";
import createWalletState, { CreateWalletState } from "module/wallet/state/CreateWalletState";

export interface UseCreateWalletResult {
    state: CreateWalletState;
    setName: (name: string | undefined) => void;
    setPin: (pin: string | undefined) => void;
    setMnemonic: (mnemonic: string[] | undefined) => void;
    reset: () => void;
}

const useCreateWallet = (): UseCreateWalletResult => {
    const [state, setState] = useRecoilState(createWalletState);

    return {
        state,
        setName: (name) => setState((s) => ({ ...s, name })),
        setPin: (pin) => setState((s) => ({ ...s, pin })),
        setMnemonic: (mnemonic) => setState((s) => ({ ...s, mnemonic })),
        reset: () => setState((s) => ({ ...s, name: undefined, pin: undefined, mnemonic: undefined })),
    };
};

export default useCreateWallet;
