import { Col, Row } from "@peersyst/react-native-components";
import { TokenIcon } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { useRecoilValue } from "recoil";
import Typography from "module/common/component/display/Typography/Typography";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { TOKEN_IMAGES, ZeroToFive, TOKEN_PLACEHOLDER_IMAGES } from "./utils/tokenImages";

export interface TokenMetadata {
    name: string;
    symbol: string;
    decimals: number;
}

export interface Token {
    metadata: TokenMetadata;
}

export interface TokenCardProps {
    token: Token;
    balance: BalanceProps["balance"];
    index?: number;
}

const TokenCard = ({ token: { metadata }, balance, index = 0 }: TokenCardProps): JSX.Element => {
    const { name, symbol, decimals } = metadata;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "binancecoin");
    const imageUri = TOKEN_IMAGES[symbol];
    const imageIndex = (index % 6) as ZeroToFive;
    return (
        <MainListCard alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap={16}>
                <TokenIcon source={imageUri ? { uri: imageUri } : TOKEN_PLACEHOLDER_IMAGES[imageIndex]} />
                <Typography variant="body3Strong" numberOfLines={1} style={{ width: "65%" }}>
                    {name}
                </Typography>
            </Row>
            <Col alignItems="flex-end" justifyContent="center" gap={2}>
                <Balance balance={balance} variant="body3Strong" units={symbol} />
                {tokenValue && (
                    <Balance
                        action="round"
                        color={(p) => p.gray["300"]}
                        options={{ maxDecimals: decimals }}
                        balance={"200"}
                        units={fiat}
                        variant="body4Strong"
                    />
                )}
            </Col>
        </MainListCard>
    );
};

export default TokenCard;
