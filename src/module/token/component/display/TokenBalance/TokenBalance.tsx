import { Col } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { TokenBalanceProps } from "./TokenBalance.types";

const TokenBalance = ({ token, alignItems = "flex-end", gap, balanceProps, fiatBalanceProps, style }: TokenBalanceProps): JSX.Element => {
    const { symbol } = token.metadata;

    return (
        <Col alignItems={alignItems} justifyContent="center" gap={gap} style={style}>
            <Balance variant={balanceProps?.variant || "body3Strong"} balance={token.balance} units={symbol} {...balanceProps} />
            <FiatBalance
                variant={fiatBalanceProps?.variant || "body4Strong"}
                light
                balance={token.balance}
                token={token}
                {...fiatBalanceProps}
            />
        </Col>
    );
};

export default TokenBalance;
