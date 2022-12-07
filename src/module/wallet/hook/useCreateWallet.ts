import { useRecoilState, useResetRecoilState } from "recoil";
import createWalletState, { CreateWalletState } from "module/wallet/state/CreateWalletState";

export interface UseCreateWalletResult {
    state: CreateWalletState;
    setName: (name: string | undefined) => void;
    setPin: (pin: string | undefined) => void;
    setMnemonic: (mnemonic: string[] | undefined) => void;
    setPrivateKey: (privateKey: string) => void;
    setImportWithPrivateKey: (importWithPrivateKey: boolean) => void;
    reset: () => void;
}

const useCreateWallet = (): UseCreateWalletResult => {
    const [state, setState] = useRecoilState(createWalletState);
    const resetRecoilState = useResetRecoilState(createWalletState);

    return {
        state,
        setName: (name) => setState((s) => ({ ...s, name })),
        setPin: (pin) => setState((s) => ({ ...s, pin })),
        setMnemonic: (mnemonic) => setState((s) => ({ ...s, mnemonic })),
        setPrivateKey: (privateKey) => setState((s) => ({ ...s, privateKey })),
        setImportWithPrivateKey: (importWithPrivateKey) => setState((s) => ({ ...s, importWithPrivateKey })),
        reset: () => resetRecoilState(),
    };
};

export default useCreateWallet;
