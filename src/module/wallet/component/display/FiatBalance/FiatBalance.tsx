import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import Balance from "../Balance/Balance";
import { BalanceProps } from "../Balance/Balance.types";
import { Token } from "near-peersyst-sdk";
import useTokenConversion from "module/token/hook/useTokenConversion";

export interface BaseFiatBalanceProps extends Omit<BalanceProps, "balance" | "action"> {
    balance: string | number;
}
export interface TokenBalanceInFiatProps extends BaseFiatBalanceProps {
    token: Token;
}

export interface FiatBalanceProps extends Omit<BaseFiatBalanceProps, "units"> {
    token?: Token;
}

const TokenBalanceInFiat = ({ balance, token, ...rest }: TokenBalanceInFiatProps) => {
    const { value } = useTokenConversion(balance, token.contractId);
    return value ? <Balance balance={value} action="round" {...rest} /> : <></>;
};

const NearBalanceInFiat = ({ balance, ...rest }: BaseFiatBalanceProps) => {
    const { value: fiatValue } = useNativeTokenConversion(balance);
    return <Balance balance={fiatValue} action="round" {...rest} />;
};

const FiatBalance = ({ token, options, ...rest }: FiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const baseProps = { options: { maximumFractionDigits: 2, minimumFractionDigits: 2, ...options }, ...rest, units: fiat };
    return (
        <>
            {token === undefined && <NearBalanceInFiat {...baseProps} />}
            {token !== undefined && <TokenBalanceInFiat token={token} {...baseProps} />}
        </>
    );
};

export default FiatBalance;
