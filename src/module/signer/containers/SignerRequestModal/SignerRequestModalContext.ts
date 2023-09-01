import { createContext, useContext } from "react";

export interface SignRequestState {
    signerWalletIndex: number | undefined;
    setSignerWalletIndex: (index: number) => void;
}

export const SignerRequestModalContext = createContext<SignRequestState>({
    signerWalletIndex: undefined,
    setSignerWalletIndex: () => undefined,
});
export const SignerRequestModalProvider = SignerRequestModalContext.Provider;
export const SignerRequestModalConsumer = SignerRequestModalContext.Consumer;

export const useSignerWalletIndex = (): [number | undefined, (index: number) => void] => {
    const { signerWalletIndex, setSignerWalletIndex } = useContext(SignerRequestModalContext);
    return [signerWalletIndex, setSignerWalletIndex];
};
