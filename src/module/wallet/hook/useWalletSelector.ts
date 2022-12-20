import { useControlled } from "@peersyst/react-hooks";
import { config } from "config";
import { WalletSelectorProps } from "../component/input/WalletSelector/WalletSelector";
import useGetBalance from "../query/useGetBalance";
import { Wallet } from "../state/WalletState";
import { WalletOperations } from "../utils/WalletOperations";
import useWalletState from "./useWalletState";

export type UseWalletSelectorParams = Pick<WalletSelectorProps, "value" | "defaultValue" | "onChange">;

export interface UseWalletSelectorResult {
    selectedIndex: number | undefined;
    selectedWallet: Wallet | undefined;
    handleChange: (i: number) => void;
    wallets: Wallet[];
    error: boolean;
}

export default function useWalletSelector({ defaultValue, value, onChange }: UseWalletSelectorParams = {}): UseWalletSelectorResult {
    const {
        state: { wallets, selectedWallet: defaultAccount = 0 },
    } = useWalletState();
    const [selectedIndex, setSelectedIndex] = useControlled((defaultValue as number) ?? defaultAccount, value as number, onChange);
    const selectedWallet = selectedIndex !== undefined ? wallets[selectedIndex] : undefined;
    const { data: { available } = { available: "0" } } = useGetBalance(selectedIndex);
    const handleChange = (i: number) => setSelectedIndex(i);

    return {
        selectedIndex,
        selectedWallet,
        handleChange,
        wallets,
        error: !WalletOperations.isBigger(available, config.minBalanceToCreateAccount),
    };
}
