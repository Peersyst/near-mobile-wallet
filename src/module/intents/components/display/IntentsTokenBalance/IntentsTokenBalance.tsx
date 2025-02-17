import { Col } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { IntentsTokenBalanceProps } from "./IntentsTokenBalance.types";
import { formatTokenAmount } from "near-peersyst-sdk";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useGetIntentsFiatPrice } from "module/intents/hooks/useGetIntentsFiatPrice";

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
    const fiatValue = getIntentsFiatPrice(symbol);

    return (
        <Col alignItems={alignItems} justifyContent="center" gap={gap} style={style}>
            <Balance variant={balanceProps?.variant || "body3Strong"} balance={parsedBalance} units={symbol} {...balanceProps} />
            {typeof fiatValue === "number" && (
                <Balance
                    variant={balanceProps?.variant || "body3Strong"}
                    balance={(Number(parsedBalance) * fiatValue).toFixed(2)}
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
