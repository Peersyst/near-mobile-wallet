import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import Balance from "../Balance/Balance";
import { BalanceProps } from "../Balance/Balance.types";

export interface FiatBalanceProps extends Omit<BalanceProps, "balance"> {
    balance: string | number;
}

const NearBalanceInFiat = ({ balance, ...rest }: FiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const { value: fiatValue } = useNativeTokenConversion(fiat, balance);
    return <Balance balance={fiatValue} {...rest} />;
};

//TODO: implement FTBalanceInFiat
const FiatBalance = ({ units, balance, ...rest }: FiatBalanceProps) => {
    const BalanceComponent = units === "token" ? NearBalanceInFiat : Balance;
    return <BalanceComponent units={units} balance="0" {...rest} />;
};

export default FiatBalance;
