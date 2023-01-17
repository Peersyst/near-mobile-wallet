import useWalletState from "module/wallet/hook/useWalletState";

interface UseSameWalletReturn {
    sameWallet: (index: number | undefined) => boolean;
}

export default function (): UseSameWalletReturn {
    const {
        state: { selectedWallet },
    } = useWalletState();

    const sameWallet = (index: number | undefined) => {
        if (index !== undefined) return index === selectedWallet;
        return false;
    };

    return { sameWallet };
}
