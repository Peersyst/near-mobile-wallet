import { useControlled } from "@peersyst/react-hooks";
import BaseAssetAmountInput from "../BaseAssetAmountInput/BaseAssetAmountInput";
import { Token } from "near-peersyst-sdk";
import { useFTAmountInputValidator } from "./hook/useFTAmountInputValidator";
import { NumericInputProps } from "module/common/component/input/NumericInput/NumericInput";
import { handleAssetAmountChange } from "../BaseAssetAmountInput/utils/handleAssetAmountChange";

export interface TokenAmountInputProps extends Omit<NumericInputProps, "validators" | "suffix"> {
    ft: Token;
}

const TokenAmountInput = ({ ft, defaultValue = "", value, onChange, error: errorProp, ...rest }: TokenAmountInputProps) => {
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    const {
        metadata: { symbol, decimals: decimalsMetadata },
    } = ft;
    const { error } = useFTAmountInputValidator({ amount, ft });

    const handleOnChange = (value: string) => handleAssetAmountChange({ amount: value, setAmount, decimals: Number(decimalsMetadata) });

    return <BaseAssetAmountInput error={errorProp || error} value={amount} onChange={handleOnChange} units={symbol} {...rest} />;
};

export default TokenAmountInput;
