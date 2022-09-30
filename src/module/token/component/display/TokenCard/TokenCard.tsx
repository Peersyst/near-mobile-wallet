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
import * as image from "../../../../../asset/image";
import { ImageSourcePropType } from "react-native";

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
    index?: number;
}

type ZeroToFive = 0 | 1 | 2 | 3 | 4 | 5;

const TOKEN_PLACEHOLDER_IMAGES: Record<ZeroToFive, ImageSourcePropType> = {
    "0": image.token_placeholder0,
    "1": image.token_placeholder1,
    "2": image.token_placeholder2,
    "3": image.token_placeholder3,
    "4": image.token_placeholder4,
    "5": image.token_placeholder5,
};

const TokenCard = ({ token: { metadata }, balance, last = false, index = 0 }: TokenCardProps): JSX.Element => {
    const { name, symbol, decimals } = metadata;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "binancecoin");
    const imageUri = TOKEN_IMAGES[symbol];
    const imageIndex = (index % 6) as ZeroToFive;
    return (
        <TokenRoot last={last}>
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
        </TokenRoot>
    );
};

export default TokenCard;
