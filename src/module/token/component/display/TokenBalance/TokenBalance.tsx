import { Col } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Token } from "near-peersyst-sdk";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { FlexAlignType } from "react-native";
import { TypographyProps } from "module/common/component/display/Typography/Typography";

export interface TokenBalanceProps extends TypographyProps {
    token: Token;
    alignItems?: FlexAlignType | undefined;
    gap?: number;
}

const TokenBalance = ({ token, alignItems = "flex-end", ...rest }: TokenBalanceProps): JSX.Element => {
    const { symbol } = token.metadata;

    return (
        <Col alignItems={alignItems} justifyContent="center" gap={2} flex={1}>
            <Balance balance={token.balance} textAlign="right" units={symbol} numberOfLines={undefined} {...rest} />
            <FiatBalance light balance={token.balance} token={token} variant="body4Strong" />
        </Col>
    );
};

export default TokenBalance;
