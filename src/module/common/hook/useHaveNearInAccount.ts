import useWalletState from "module/wallet/hook/useWalletState";
import useGetBalance from "module/wallet/query/useGetBalance";

export default function useHaveNearInAccount(): boolean {
    const { state } = useWalletState();
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(state.selectedWallet);
    const haveNearInAccount = !isLoading && available !== "0";
    return haveNearInAccount;
}
