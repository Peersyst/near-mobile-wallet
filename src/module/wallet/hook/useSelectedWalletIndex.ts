import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

export default function (): number {
    const { index } = useSelectedWallet();
    return index;
}
