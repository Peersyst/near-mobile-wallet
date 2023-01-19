import { useTranslate } from "module/common/hook/useTranslate";
import NEARAmountTextField, {
    NEARAmountTextFieldProps,
} from "module/transaction/component/input/AssetAmountTextField/NEARAmountTextField/NEARAmountTextField";
import { useControlled } from "@peersyst/react-hooks";
import Typography from "module/common/component/display/Typography/Typography";
import useGetBalance from "module/wallet/query/useGetBalance";
import { Spinner } from "@peersyst/react-native-components";
import { useNEARAmountWithMaxTextFieldController } from "./hook/useNEARAmountWithMaxTextFieldController";

export type BaseNEARAmountWithMaxTextFieldProps = Omit<NEARAmountTextFieldProps, "suffix" | "hint">;

export type NEARAmountWithMaxTextFieldProps = BaseNEARAmountWithMaxTextFieldProps & {
    isLoading?: boolean;
};

const NEARAmountWithMaxTextField = ({
    value,
    defaultValue = "",
    onChange,
    maxAmount,
    index,
    isLoading: isLoadingProp,
    ...rest
}: NEARAmountWithMaxTextFieldProps) => {
    const translate = useTranslate();
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    const { isLoading } = useGetBalance(index);
    const { hint, maxBalance } = useNEARAmountWithMaxTextFieldController({ index, maxAmount });

    const changeToMaxBalance = () => {
        setAmount(maxBalance);
    };

    return (
        <NEARAmountTextField
            index={index}
            hint={hint}
            suffix={
                isLoadingProp || isLoading ? (
                    <Spinner size="small" />
                ) : (
                    <Typography variant="body2Strong" onPress={changeToMaxBalance}>
                        {translate("max")!}
                    </Typography>
                )
            }
            maxAmount={maxAmount}
            value={amount}
            onChange={setAmount}
            {...rest}
        />
    );
};

export default NEARAmountWithMaxTextField;
