import useWalletState from "module/wallet/hook/useWalletState";
import useGetBalance from "module/wallet/query/useGetBalance";
import { useEffect, useState } from "react";

export default function useHaveNearInAccount(): boolean {
    const { state } = useWalletState();
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(state.selectedWallet);
    const [haveNearInAccount, setHaveNearInAccount] = useState<boolean>(false);

    useEffect(() => {
        if (!isLoading && available !== "0") {
            setHaveNearInAccount(true);
        }
    }, [isLoading, available]);

    return haveNearInAccount;
}
