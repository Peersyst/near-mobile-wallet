import { Col, Row, Typography } from "react-native-components";
import { TokenIcon, TokenRoot } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import useCkbConversion from "module/common/hook/useCkbConversion";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { tokensList } from "module/token/mock/token";
import { TokenAmount } from "@peersyst/ckb-peersyst-sdk";

interface TokenProps {
    token: TokenAmount;
}

const TokenCard = ({ token }: TokenProps): JSX.Element => {
    const { name, tokenName, imageUri, description, args } = tokensList.find((t) => t.args === token.type.args) || {};
    const { fiat } = useRecoilValue(settingsState);
    const { value } = useCkbConversion(fiat, token.amount * (args === "0x3" ? 3000 : 100));
    return (
        <TokenRoot>
            <Row alignItems="center" gap="6%">
                <TokenIcon source={{ uri: imageUri }} />
                <Col>
                    <Typography variant="body1" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                </Col>
            </Row>
            <Col alignItems="flex-end">
                <Balance balance={token.amount} smallBalance units={tokenName || ""} boldUnits variant="body2" />
                <Balance balance={value} units={fiat} variant={"button"} />
            </Col>
        </TokenRoot>
    );
};

export default TokenCard;
