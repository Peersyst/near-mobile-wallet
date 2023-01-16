import { useRecoilValue } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import useGetBalance from "module/wallet/query/useGetBalance";
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

export type NEARAmountWithMaxTextFieldProps = Omit<NEARAmountTextFieldProps, "suffix" | "hint">;

const NEARAmountWithMaxTextField = ({ value, defaultValue = "", onChange, ...rest }: NEARAmountWithMaxTextFieldProps) => {
    const translate = useTranslate();
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);

    const { data: { available } = { available: "0" } } = useGetBalance();

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
            hint={translate("available_balance", { amount: formattedBalance, amount_price: formattedBalanceInFiat })!}
            suffix={
                <Typography variant="body2Strong" onPress={changeToMaxBalance}>
                    {translate("max")!}
                </Typography>
            }
            value={amount}
            onChange={setAmount}
            {...rest}
        />
    );
};

export default NEARAmountWithMaxTextField;
