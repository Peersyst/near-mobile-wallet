import { Col, Row } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { Token } from "near-peersyst-sdk";
import TokenIcon from "../TokenIcon/TokenIcon";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
    const { name, symbol } = token.metadata;

    return (
        <MainListCard alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap={16}>
                <TokenIcon token={token} />
                <Typography variant="body3Strong" numberOfLines={1} style={{ flex: 0.6 }}>
                    {name}
                </Typography>
            </Row>
            <Col alignItems="flex-end" justifyContent="center" gap={2}>
                <Balance balance={token.balance} variant="body3Strong" units={symbol} />
                <FiatBalance light balance={token.balance} token={token} variant="body4Strong" />
            </Col>
        </MainListCard>
    );
};

export default TokenCard;
