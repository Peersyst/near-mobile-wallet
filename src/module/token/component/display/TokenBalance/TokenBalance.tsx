import { Col } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Token } from "near-peersyst-sdk";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { FlexAlignType } from "react-native";

export interface TokenBalanceProps {
    token: Token;
    alignItems?: FlexAlignType | undefined;
}

const TokenBalance = ({ token, alignItems = "flex-end" }: TokenBalanceProps): JSX.Element => {
    const { symbol } = token.metadata;

    return (
        <Col alignItems={alignItems} justifyContent="center" gap={2} flex={1}>
            <Balance balance={token.balance} variant="body3Strong" textAlign="right" units={symbol} numberOfLines={undefined} />
            <FiatBalance light balance={token.balance} token={token} variant="body4Strong" />
        </Col>
    );
};

export default TokenBalance;
