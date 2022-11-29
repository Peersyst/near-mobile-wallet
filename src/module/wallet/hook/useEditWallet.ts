import useWalletState from "module/wallet/hook/useWalletState";
import { useMemo } from "react";
import { Wallet } from "../state/WalletState";

export interface UseEditWalletResult {
    setColorIndex: (index: number) => void;
    reset: () => void;
    initialState: { account: string; colorIndex: number };
}

export default function (index: number): UseEditWalletResult {
    const {
        state: { wallets },
        setWallets,
    } = useWalletState();

    const initialState = useMemo(() => {
        const { account, colorIndex } = wallets[index];
        return {
            account,
            colorIndex,
        };
    }, [index]);

    const updateWallet = (info: Partial<Wallet>) => {
        setWallets(wallets.map((wallet, mapIndex) => (mapIndex === index ? { ...wallet, ...info } : wallet)));
    };

    const setColorIndex = (colorIndex: number) => updateWallet({ colorIndex });

    const reset = () => updateWallet(initialState);

    return {
        setColorIndex,
        reset,
        initialState,
    };
}
