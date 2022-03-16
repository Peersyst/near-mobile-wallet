import { Col, Row, Typography } from "react-native-components";
import { TokenIcon, TokenRoot } from "./TokenCard.styles";
import { TokenAmount } from "../../../types";
import Balance from "module/wallet/component/display/Balance/Balance";
import { translate } from "locale";
import useCkbConversion from "module/common/hook/useCkbConversion";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";

interface TokenProps {
    token: TokenAmount;
}

const TokenCard = ({ token }: TokenProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { value } = useCkbConversion(fiat, token.amount);
    return (
        <TokenRoot>
            <Row alignItems="center" gap={10}>
                <TokenIcon source={{ uri: token.type.tokenUri }} />
                <Typography variant="body1" fontWeight="bold">
                    {token.type.tokenName}
                </Typography>
            </Row>
            <Col alignItems="flex-end">
                <Balance balance={token.amount.toString()} smallBalance units={translate("token")} boldUnits variant={"body1"} />
                <Balance balance={value.toString()} units={fiat} variant={"button"} />
            </Col>
        </TokenRoot>
    );
};

export default TokenCard;
