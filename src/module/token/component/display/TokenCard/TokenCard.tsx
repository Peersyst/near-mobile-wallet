import { Col, Row, Typography } from "react-native-components";
import { TokenIcon, TokenPlaceholder, TokenRoot } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import useCkbConversion from "module/common/hook/useCkbConversion";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { TokenAmount } from "module/token/types";
import { translate } from "locale";

interface TokenProps {
    token: TokenAmount;
}

const TokenCard = ({
    token: {
        type: { name, tokenName, imageUri, description, args },
        amount,
    },
}: TokenProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { value } = useCkbConversion(fiat, amount * (args === "0x3" ? 3000 : 100));
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
                    balance={amount}
                    smallBalance
                    units={tokenName ? (tokenName === "Unknown Token" ? "?" : tokenName) : ""}
                    boldUnits
                    variant="body2"
                />
                <Balance balance={value} units={fiat} variant={"button"} />
            </Col>
        </TokenRoot>
    );
};

export default TokenCard;
