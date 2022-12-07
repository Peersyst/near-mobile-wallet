import useWalletState from "./useWalletState";

export default function (): number {
    const {
        state: { selectedWallet },
    } = useWalletState();
    return selectedWallet;
}
