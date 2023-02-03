import { useControlled } from "@peersyst/react-hooks";
import { WalletSelectorProps } from "../component/input/WalletSelector/WalletSelector";
import useGetBalance from "../query/useGetBalance";
import { Wallet } from "../state/WalletState";
import { BalanceOperations } from "near-peersyst-sdk";
import useWalletState from "./useWalletState";
import { useTranslate } from "module/common/hook/useTranslate";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";

export type UseWalletSelectorParams = Pick<WalletSelectorProps, "value" | "defaultValue" | "onChange" | "minBalance">;

export interface UseWalletSelectorResult {
    selectedIndex: number | undefined;
    selectedWallet: Wallet | undefined;
    setWalletIndex: (i: number) => void;
    wallets: Wallet[];
    error: TextFieldProps["error"];
    hideError: TextFieldProps["hideError"];
}

export default function useWalletSelector({
    defaultValue,
    value,
    onChange,
    minBalance,
}: UseWalletSelectorParams = {}): UseWalletSelectorResult {
    const {
        state: { wallets, selectedWallet: defaultAccount = 0 },
    } = useWalletState();
    const translateError = useTranslate("error");
    const [selectedIndex, setSelectedIndex] = useControlled((defaultValue as number) ?? defaultAccount, value as number, onChange);
    const selectedWallet = selectedIndex !== undefined ? wallets[selectedIndex] : undefined;
    const { data: { available } = { available: "0" }, isLoading } = useGetBalance(selectedIndex);
    const setWalletIndex = (i: number) => setSelectedIndex(i);

    const error: TextFieldProps["error"] = [
        !BalanceOperations.isBigger(available, minBalance ?? "0"),
        translateError("invalid_seleccted_account", { amountInNEAR: minBalance }),
    ];

    return {
        selectedIndex,
        selectedWallet,
        setWalletIndex,
        wallets,
        error: minBalance === undefined ? undefined : error,
        hideError: isLoading,
    };
}
