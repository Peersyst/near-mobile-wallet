import { Col, Row } from "@peersyst/react-native-components";
import { TokenIcon } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { useRecoilValue } from "recoil";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { placeholder_image } from "images";
import { TokenAmount } from "module/token/types";

export interface TokenCardProps {
    token: TokenAmount;
}

const TokenCard = ({ token: { type, amount } }: TokenCardProps): JSX.Element => {
    const { name, tokenName, imageUri } = type;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, type);

    return (
        <MainListCard alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap={16}>
                <TokenIcon source={imageUri ? { uri: imageUri } : placeholder_image} />
                <Typography variant="body3Strong" numberOfLines={1} style={{ maxWidth: "50%" }}>
                    {name}
                </Typography>
            </Row>
            <Col alignItems="flex-end" justifyContent="center" gap={2}>
                <Balance
                    options={{ maximumFractionDigits: 4 }}
                    balance={amount / 10 ** type.decimals}
                    units={tokenName ? (tokenName === "Unknown Token" ? "?" : tokenName) : ""}
                    variant="body2"
                />
                {tokenValue && <Balance action="round" light balance={tokenValue} units={fiat} variant="body4Strong" />}
            </Col>
        </MainListCard>
    );
};

export default TokenCard;
