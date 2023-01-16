import { useControlled } from "@peersyst/react-hooks";
import { BaseAssetAmountTextFieldProps } from "../BaseAssetAmountTextField";

export interface UseAssetAmountStateParams {
    defaultValue: BaseAssetAmountTextFieldProps["defaultValue"];
    value: BaseAssetAmountTextFieldProps["value"];
    onChange: BaseAssetAmountTextFieldProps["onChange"];
    decimals: number | string;
}

export type UseAssetAmountStateReturn = [string, UseAssetAmountStateParams["onChange"]];

export const useAssetAmountState = ({
    value,
    defaultValue = "",
    onChange,
    decimals: decimalsParams,
}: UseAssetAmountStateParams): UseAssetAmountStateReturn => {
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    const handleChange = (amount: string) => {
        const [int, dec] = amount.split(".");
        if (dec) {
            setAmount(`${int}.${dec.slice(0, Number(decimalsParams))}`);
        } else {
            setAmount(amount);
        }
    };
    return [amount, handleChange];
};
