import useGetBalance from "module/wallet/query/useGetBalance";
import { config } from "refactor/common/config";
import BaseAssetAmountTextField from "../BaseAssetAmountTextField/BaseAssetAmountTextField";
import { NumericTextFieldProps } from "module/common/component/input/NumericTextField/NumericTextField";
import { useNEARAmountTextFieldValidator } from "./hook/useNEARAmountTextFieldValidator";
import { useControlled } from "@peersyst/react-hooks";

export interface NEARAmountTextFieldProps extends Omit<NumericTextFieldProps, "validators" | "maxDecimals"> {
    index?: number;
    maxAmount?: string; //in NEAR
    fee?: string; //in NEAR
}

const NEARAmountTextField = ({
    index,
    defaultValue = "",
    value,
    onChange,
    error: errorProp,
    maxAmount,
    fee,
    ...rest
}: NEARAmountTextFieldProps) => {
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    const { error } = useNEARAmountTextFieldValidator({ index, amount, maxAmount, fee });
    const { isLoading } = useGetBalance(index);

    return (
        <BaseAssetAmountTextField
            error={errorProp || error}
            value={amount}
            maxDecimals={24}
            onChange={setAmount}
            loading={isLoading}
            units={config.tokenName}
            {...rest}
        />
    );
};

export default NEARAmountTextField;
