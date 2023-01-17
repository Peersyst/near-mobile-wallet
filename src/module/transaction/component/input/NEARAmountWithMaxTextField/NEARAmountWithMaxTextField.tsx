import { useRecoilValue } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { config } from "config";
import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import { subtractNearAmounts } from "near-peersyst-sdk";
import settingsState from "module/settings/state/SettingsState";
import NEARAmountTextField, {
    NEARAmountTextFieldProps,
} from "module/transaction/component/input/AssetAmountTextField/NEARAmountTextField/NEARAmountTextField";
import { useControlled } from "@peersyst/react-hooks";
import Typography from "module/common/component/display/Typography/Typography";
import useGetBalance from "module/wallet/query/useGetBalance";
import { Spinner } from "@peersyst/react-native-components";

export type BaseNEARAmountWithMaxTextFieldProps = Omit<NEARAmountTextFieldProps, "suffix" | "hint">;

export type NEARAmountWithMaxTextFieldProps = BaseNEARAmountWithMaxTextFieldProps & {
    available: string;
    isLoading?: boolean;
};

const NEARAmountWithMaxTextField = ({
    value,
    defaultValue = "",
    onChange,
    available,
    index,
    isLoading: isLoadingProp,
    ...rest
}: NEARAmountWithMaxTextFieldProps) => {
    const translate = useTranslate();
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    const { isLoading } = useGetBalance(index);
    const maxBalance = subtractNearAmounts(available, config.estimatedFee);

    const maxBalanceInFiat = useNativeTokenConversion(maxBalance);

    const { fiat } = useRecoilValue(settingsState);
    const formattedBalanceInFiat = useFormatBalance(maxBalanceInFiat.value, {
        numberFormatOptions: { maximumFractionDigits: 2 },
        units: fiat,
        action: "round",
    });

    const formattedBalance = useFormatBalance(maxBalance, {
        numberFormatOptions: { maximumFractionDigits: 2 },
    });

    const changeToMaxBalance = () => {
        setAmount(maxBalance);
    };

    return (
        <NEARAmountTextField
            index={index}
            hint={translate("available_balance", { amount: formattedBalance, amount_price: formattedBalanceInFiat })!}
            suffix={
                isLoadingProp || isLoading ? (
                    <Spinner size="small" />
                ) : (
                    <Typography variant="body2Strong" onPress={changeToMaxBalance}>
                        {translate("max")!}
                    </Typography>
                )
            }
            value={amount}
            onChange={setAmount}
            {...rest}
        />
    );
};

export default NEARAmountWithMaxTextField;
