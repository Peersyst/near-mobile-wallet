import useWalletState from "module/wallet/hook/useWalletState";
import { useMemo } from "react";

export interface UseEditWalletResult {
    setName: (name: string) => void;
    setColorIndex: (index: number) => void;
    reset: () => void;
    initialState: { name: string; colorIndex: number };
}

export default function (index: number): UseEditWalletResult {
    const {
        state: { wallets },
        setWallets,
    } = useWalletState();

    const initialState = useMemo(() => {
        const { name, colorIndex } = wallets.find((wallet) => wallet.index === index)!;

        return {
            name,
            colorIndex,
        };
    }, [index]);

    const setName = (name: string) => {
        setWallets(wallets.map((wallet) => (wallet.index === index ? { ...wallet, name } : wallet)));
    };

    const setColorIndex = (colorIndex: number) => {
        setWallets(wallets.map((wallet) => (wallet.index === index ? { ...wallet, colorIndex } : wallet)));
    };

    const reset = () => {
        setWallets(wallets.map((wallet) => (wallet.index === index ? { ...wallet, ...initialState } : wallet)));
    };

    return {
        setName,
        setColorIndex,
        reset,
        initialState,
    };
}
