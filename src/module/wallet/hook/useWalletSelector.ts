import { useControlled } from "@peersyst/react-hooks";
import { WalletSelectorProps } from "../component/input/WalletSelector/WalletSelector";
import useWalletState from "./useWalletState";

export type UseWalletSelectorParams = Pick<WalletSelectorProps, "value" | "defaultValue" | "onChange">;

export default function useWalletSelector({ defaultValue, value, onChange }: UseWalletSelectorParams) {
    const {
        state: { wallets, selectedWallet: defaultAccount = 0 },
    } = useWalletState();
    const [selectedIndex, setSelectedIndex] = useControlled((defaultValue as number) ?? defaultAccount, value as number, onChange);
    const selectedWallet = selectedIndex !== undefined ? wallets[selectedIndex] : undefined;

    const handleChange = (i: number) => setSelectedIndex(i);

    return {
        selectedIndex,
        selectedWallet,
        handleChange,
        wallets,
    };
}
