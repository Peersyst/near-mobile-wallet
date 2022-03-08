import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import walletState from "module/wallet/state/WalletState";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const setWalletState = useSetRecoilState(walletState);

    useEffect(() => {
        WalletStorage.getName().then((name) => {
            if (name) setWalletState((state) => ({ ...state, hasWallet: true, name }));
            setLoading(false);
        });
    }, [setWalletState]);

    return loading;
}
