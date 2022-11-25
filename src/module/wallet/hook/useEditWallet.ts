import useWalletState from "module/wallet/hook/useWalletState";
import { useMemo } from "react";
import { getWallet, updateWallet } from "../utils/wallet.utils";

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
        const { account, colorIndex } = getWallet(index, wallets)!;
        return {
            account,
            colorIndex,
        };
    }, [index]);

    const setColorIndex = (colorIndex: number) => {
        setWallets(updateWallet(wallets, index, { colorIndex }));
    };

    const reset = () => {
        setWallets(wallets.map((wallet) => (wallet.index === index ? { ...wallet, ...initialState } : wallet)));
    };

    return {
        setColorIndex,
        reset,
        initialState,
    };
}
