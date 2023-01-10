import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import { useGetTokenPrice } from "module/common/query/useGetTokenPrice";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import Balance from "../Balance/Balance";
import { BalanceProps } from "../Balance/Balance.types";
import { Token } from "near-peersyst-sdk";
import useNativeTokenPrice from "module/common/hook/useNativeTokePrice";
import { useGetFiatPrice } from "module/common/hook/useGetFiatPrice";

export interface BaseFiatBalanceProps extends Omit<BalanceProps, "balance" | "action"> {
    balance: string | number;
    token: Token;
}

export interface FiatBalanceProps extends BaseFiatBalanceProps {
    tokenUnits?: string;
}

const TokenBalanceInFiat = ({ balance, token, ...rest }: BaseFiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useNativeTokenPrice(token.contractId!);
    const { data = 0 } = useGetFiatPrice(fiat);
    return tokenValue ? <Balance balance={tokenValue * Number(balance) * data} action="round" {...rest} /> : <></>;
};

const NearBalanceInFiat = ({ balance, ...rest }: BaseFiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const { value: fiatValue } = useNativeTokenConversion(fiat, balance);
    return <Balance balance={fiatValue} action="round" {...rest} />;
};

//TODO: implement FTBalanceInFiat
const FiatBalance = ({ units, tokenUnits, options, ...rest }: FiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const BalanceComponent = tokenUnits === "token" ? NearBalanceInFiat : TokenBalanceInFiat;
    return (
        <BalanceComponent options={{ maximumFractionDigits: 2, minimumFractionDigits: 2, ...options }} units={units ?? fiat} {...rest} />
    );
};

export default FiatBalance;
