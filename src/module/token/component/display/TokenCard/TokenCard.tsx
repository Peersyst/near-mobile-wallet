import { Col, Row } from "@peersyst/react-native-components";
import { TokenIcon } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { useRecoilValue } from "recoil";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { placeholder_image } from "images";
import { Token } from "module/sdk/mock.types";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token: { metadata, balance } }: TokenCardProps): JSX.Element => {
    const { name, symbol, decimals, imageUri } = metadata;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "binancecoin");

    return (
        <MainListCard alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap={16}>
                <TokenIcon source={imageUri ? { uri: imageUri } : placeholder_image} />
                <Typography variant="body3Strong" numberOfLines={1} style={{ width: "65%" }}>
                    {name}
                </Typography>
            </Row>
            <Col alignItems="flex-end" justifyContent="center" gap={2}>
                <Balance balance={balance} variant="body3Strong" units={symbol} />
                {tokenValue && (
                    <Balance
                        action="round"
                        light
                        options={{ maxDecimals: decimals }}
                        balance={tokenValue}
                        units={fiat}
                        variant="body4Strong"
                    />
                )}
            </Col>
        </MainListCard>
    );
};

export default TokenCard;
