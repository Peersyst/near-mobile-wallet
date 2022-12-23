import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import Balance from "../Balance/Balance";
import { BalanceProps } from "../Balance/Balance.types";

export interface BaseFiatBalanceProps extends Omit<BalanceProps, "balance" | "action"> {
    balance: string | number;
}

export interface FiatBalanceProps extends BaseFiatBalanceProps {
    tokenUnits?: string;
}

const NearBalanceInFiat = ({ balance, ...rest }: BaseFiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const { value: fiatValue } = useNativeTokenConversion(fiat, balance);
    console.log("fiatValue", fiatValue);
    return <Balance balance={fiatValue} {...rest} />;
};

//TODO: implement FTBalanceInFiat
const FiatBalance = ({ units, tokenUnits, options, ...rest }: FiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const BalanceComponent = tokenUnits === "token" ? NearBalanceInFiat : Balance;
    return (
        <BalanceComponent
            options={{ maximumFractionDigits: 2, minimumFractionDigits: 2, ...options }}
            units={units ?? fiat}
            {...rest}
            action="round"
        />
    );
};

export default FiatBalance;
