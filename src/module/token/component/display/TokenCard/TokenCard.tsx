import { Col, Row } from "@peersyst/react-native-components";
import { TokenIcon, TokenPlaceholder, TokenRoot } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { useRecoilValue } from "recoil";
import Typography from "module/common/component/display/Typography/Typography";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

export interface TokenMetadata {
    name: string;
    symbol: string;
    decimals: number;
}

export interface Token {
    metadata: TokenMetadata;
    imageUri: string;
}

export interface TokenCardProps {
    token: Token;
    balance: BalanceProps["balance"];
}

const TokenCard = ({ token: { metadata, imageUri }, balance }: TokenCardProps): JSX.Element => {
    const { name, symbol } = metadata;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "binancecoin");

    return (
        <TokenRoot>
            <Row alignItems="center" gap={16}>
                {imageUri ? <TokenIcon source={{ uri: imageUri }} /> : <TokenPlaceholder />}

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
