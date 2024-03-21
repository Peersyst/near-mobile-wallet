import { Col } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Token } from "near-peersyst-sdk";
import FiatBalance, { FiatBalanceProps } from "module/wallet/component/display/FiatBalance/FiatBalance";
import { DimensionValue, FlexAlignType, ViewStyle } from "react-native";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

export interface TokenBalanceProps {
    token: Token;
    alignItems?: FlexAlignType | undefined;
    gap?: DimensionValue | undefined;
    balanceProps?: Omit<BalanceProps, "balance">;
    fiatBalanceProps?: Omit<FiatBalanceProps, "balance">;
    style?: ViewStyle;
}

const TokenBalance = ({ token, alignItems = "flex-end", gap, balanceProps, fiatBalanceProps, style }: TokenBalanceProps): JSX.Element => {
    const { symbol } = token.metadata;

    return (
        <Col alignItems={alignItems} justifyContent="center" gap={gap} style={style}>
            <Balance variant={balanceProps?.variant || "body3Strong"} balance={token.balance} units={symbol} {...balanceProps} />
            <FiatBalance variant={balanceProps?.variant || "body4Strong"} balance={token.balance} token={token} {...fiatBalanceProps} />
        </Col>
    );
};

export default TokenBalance;
