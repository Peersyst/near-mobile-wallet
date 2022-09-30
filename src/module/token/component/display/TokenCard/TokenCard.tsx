import { Col, Row } from "@peersyst/react-native-components";
import { TokenIcon, TokenRoot } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { useRecoilValue } from "recoil";
import Typography from "module/common/component/display/Typography/Typography";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { MainListCardProps } from "module/main/component/display/MainListCard/MainListCard";
import { TOKEN_IMAGES } from "./utils/TokenImages";
import { token_placeholder } from "images";

export interface TokenMetadata {
    name: string;
    symbol: string;
    decimals: number;
}

export interface Token {
    metadata: TokenMetadata;
}

export interface TokenCardProps extends Partial<MainListCardProps> {
    token: Token;
    balance: BalanceProps["balance"];
}

const TokenCard = ({ token: { metadata }, balance, last = false }: TokenCardProps): JSX.Element => {
    const { name, symbol } = metadata;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "binancecoin");
    const imageUri = TOKEN_IMAGES[symbol];

    return (
        <TokenRoot last={last}>
            <Row alignItems="center" gap={16}>
                <TokenIcon source={require(token_placeholder)} />

                <Typography variant="body3Strong">{name}</Typography>
            </Row>
            <Col alignItems="flex-end">
                <Balance balance={balance} variant="body3Strong" units={symbol} />
                {tokenValue && <Balance action="round" color={(p) => p.gray["300"]} balance={"200"} units={fiat} variant="body4Strong" />}
            </Col>
        </TokenRoot>
    );
};

export default TokenCard;
