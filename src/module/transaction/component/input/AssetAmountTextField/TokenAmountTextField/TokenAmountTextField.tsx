import BaseAssetAmountTextField from "../BaseAssetAmountTextField/BaseAssetAmountTextField";
import { Token } from "near-peersyst-sdk";
import { NumericTextFieldProps } from "module/common/component/input/NumericTextField/NumericTextField";
import { useFTAmountTextFieldValidator } from "./hook/useFTAmountTextFieldValidator";
import { useControlled } from "@peersyst/react-hooks";

export interface TokenAmountTextFieldProps extends Omit<NumericTextFieldProps, "validators" | "suffix"> {
    token: Token;
}

const TokenAmountTextField = ({ token, defaultValue = "", value, onChange, error: errorProp, ...rest }: TokenAmountTextFieldProps) => {
    const {
        metadata: { symbol, decimals: decimalsMetadata },
    } = token;
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);

    const { error } = useFTAmountTextFieldValidator({ amount, token });

    return (
        <BaseAssetAmountTextField
            maxDecimals={parseInt(decimalsMetadata, 10)}
            error={errorProp || error}
            value={amount}
            onChange={setAmount}
            units={symbol}
            {...rest}
        />
    );
};

export default TokenAmountTextField;
