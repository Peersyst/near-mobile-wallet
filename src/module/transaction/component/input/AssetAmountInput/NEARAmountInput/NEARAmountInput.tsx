import { useControlled } from "@peersyst/react-hooks";
import useGetBalance from "module/wallet/query/useGetBalance";
import { config } from "config";
import { useNEARAmountInputValidator } from "./hook/useNEARAmountInputValidator";
import BaseAssetAmountInput from "../BaseAssetAmountInput/BaseAssetAmountInput";
import { NumericInputProps } from "module/common/component/input/NumericInput/NumericInput";
import { handleAssetAmountChange } from "../BaseAssetAmountInput/utils/handleAssetAmountChange";

export interface NEARAmountInputProps extends Omit<NumericInputProps, "validators"> {
    index: number;
}

const NEARAmountInput = ({ index, defaultValue = "", value, onChange, error: errorProp, ...rest }: NEARAmountInputProps) => {
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    const { error } = useNEARAmountInputValidator({ index, amount });
    const { isLoading } = useGetBalance(index);

    const handleOnChange = (value: string) => handleAssetAmountChange({ amount: value, setAmount, decimals: 24 });

    return (
        <BaseAssetAmountInput
            error={errorProp || error}
            value={amount}
            onChange={handleOnChange}
            loading={isLoading}
            units={config.tokenName}
            {...rest}
        />
    );
};

export default NEARAmountInput;
