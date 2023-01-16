import BaseAssetAmountTextField from "../BaseAssetAmountTextField/BaseAssetAmountTextField";
import { Token } from "near-peersyst-sdk";
import { NumericTextFieldProps } from "module/common/component/input/NumericTextField/NumericTextField";
import { useFTAmountTextFieldValidator } from "./hook/useFTAmountTextFieldValidator";
import { useAssetAmountState } from "../BaseAssetAmountTextField/hook/useAssetAmountState";

export interface TokenAmountTextFieldProps extends Omit<NumericTextFieldProps, "validators" | "suffix"> {
    token: Token;
}

const TokenAmountTextField = ({ token, defaultValue = "", value, onChange, error: errorProp, ...rest }: TokenAmountTextFieldProps) => {
    const {
        metadata: { symbol, decimals: decimalsMetadata },
    } = token;
    const [amount, setAmount] = useAssetAmountState({ defaultValue, value, onChange, decimals: decimalsMetadata });

    const { error } = useFTAmountTextFieldValidator({ amount, token });

    return <BaseAssetAmountTextField error={errorProp || error} value={amount} onChange={setAmount} units={symbol} {...rest} />;
};

export default TokenAmountTextField;
