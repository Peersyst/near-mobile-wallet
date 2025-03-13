import { Col } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { IntentsTokenBalanceProps } from "./IntentsTokenBalance.types";
import { formatTokenAmount } from "near-peersyst-sdk";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useGetIntentsFiatPrice } from "module/intents/hooks/useGetIntentsFiatPrice";
import BigNumber from "bignumber.js";

const IntentsTokenBalance = ({
    token,
    alignItems = "flex-end",
    gap,
    balanceProps,
    fiatBalanceProps,
    style,
}: IntentsTokenBalanceProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const symbol = token.symbol;
    const parsedBalance = formatTokenAmount(token.totalBalance, token.decimals.toString());
    const { getIntentsFiatPrice } = useGetIntentsFiatPrice();
    const tokenFiatPrice = getIntentsFiatPrice(token);

    return (
        <Col alignItems={alignItems} justifyContent="center" gap={gap} style={style}>
            <Balance variant={balanceProps?.variant || "body3Strong"} balance={parsedBalance} units={symbol} {...balanceProps} />
            {typeof tokenFiatPrice === "string" && (
                <Balance
                    variant={balanceProps?.variant || "body3Strong"}
                    balance={new BigNumber(parsedBalance).multipliedBy(tokenFiatPrice).toFixed(2)}
                    action="round"
                    light
                    units={fiat}
                    {...balanceProps}
                    {...fiatBalanceProps}
                />
            )}
        </Col>
    );
};

export default IntentsTokenBalance;
