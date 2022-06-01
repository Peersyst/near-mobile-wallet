import { Col, Row, Typography } from "react-native-components";
import { TokenIcon, TokenPlaceholder, TokenRoot } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import { TokenAmount } from "module/token/types";
import { translate } from "locale";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { useRecoilValue } from "recoil";

interface TokenProps {
    token: TokenAmount;
}

const TokenCard = ({ token: { type, amount } }: TokenProps): JSX.Element => {
    const { name, tokenName, imageUri, description } = type;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, type);
    return (
        <TokenRoot>
            <Row alignItems="center" gap="6%">
                {imageUri ? <TokenIcon source={{ uri: imageUri }} /> : <TokenPlaceholder />}
                <Col>
                    <Typography variant="body1" fontWeight="bold">
                        {name === "Unknown Token" ? translate("unknown_token") : name}
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                </Col>
            </Row>
            <Col alignItems="flex-end">
                <Balance
                    balance={amount / 10 ** type.decimals}
                    decimals={4}
                    smallBalance
                    units={tokenName ? (tokenName === "Unknown Token" ? "?" : tokenName) : ""}
                    boldUnits
                    variant="body2"
                />
                {tokenValue && <Balance balance={tokenValue * (amount / 10 ** type.decimals)} units={fiat} variant="body2" />}
            </Col>
        </TokenRoot>
    );
};

export default TokenCard;
