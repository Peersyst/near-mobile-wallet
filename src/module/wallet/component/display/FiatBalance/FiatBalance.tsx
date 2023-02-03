import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import Balance from "../Balance/Balance";
import { BalanceActions, BalanceProps } from "../Balance/Balance.types";
import { BalanceOperations, Token } from "near-peersyst-sdk";
import useTokenConversion from "module/token/hook/useTokenConversion";
import { FIAT_THRESHOLDS } from "./fiatThresholds";

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
    const isBiggerThanMinThreshold = BalanceOperations.isBigger(balance, FIAT_THRESHOLDS[FIAT_THRESHOLDS.length - 1].value);
    return value ? <Balance balance={value} {...(isBiggerThanMinThreshold && { action: BalanceActions.ROUND })} {...rest} /> : <></>;
};

const NearBalanceInFiat = ({ balance, ...rest }: BaseFiatBalanceProps) => {
    const { value: fiatValue } = useNativeTokenConversion(balance);
    const isBiggerThanMinThreshold = BalanceOperations.isBigger(balance, FIAT_THRESHOLDS[FIAT_THRESHOLDS.length - 1].value);
    return <Balance balance={fiatValue} {...(isBiggerThanMinThreshold && { action: BalanceActions.ROUND })} {...rest} />;
};

const FiatBalance = ({ token, ...rest }: FiatBalanceProps) => {
    const { fiat } = useRecoilValue(settingsState);
    const baseProps = { ...rest, units: fiat, thresholds: FIAT_THRESHOLDS, minimumFallbackDisplay: "0.01" };
    return (
        <>
            {token === undefined && <NearBalanceInFiat {...baseProps} />}
            {token !== undefined && <TokenBalanceInFiat token={token} {...baseProps} />}
        </>
    );
};

export default FiatBalance;
