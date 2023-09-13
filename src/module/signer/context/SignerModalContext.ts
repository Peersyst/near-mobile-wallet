import { createContext, useContext } from "react";

export interface SignState {
    signerWalletIndex: number | undefined;
    setSignerWalletIndex: (index: number) => void;
}

export const SignerModalContext = createContext<SignState>({
    signerWalletIndex: undefined,
    setSignerWalletIndex: () => undefined,
});
export const SignerModalProvider = SignerModalContext.Provider;
export const SignerModalConsumer = SignerModalContext.Consumer;

export const useSignerWalletIndex = (): [number | undefined, (index: number) => void] => {
    const { signerWalletIndex, setSignerWalletIndex } = useContext(SignerModalContext);
    return [signerWalletIndex, setSignerWalletIndex];
};
