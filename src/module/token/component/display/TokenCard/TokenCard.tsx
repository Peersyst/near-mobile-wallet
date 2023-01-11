import { Col, Row } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { Token } from "near-peersyst-sdk";
import TokenIcon from "../TokenIcon/TokenIcon";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
    const { name, symbol, icon } = token.metadata;
    const { fiat } = useRecoilValue(settingsState);
    return (
        <MainListCard alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap={16}>
                <TokenIcon icon={icon} symbol={symbol} />
                <Typography variant="body3Strong" numberOfLines={1} style={{ maxWidth: "70%" }}>
                    {name}
                </Typography>
            </Row>
            <Col alignItems="flex-end" justifyContent="center" gap={2}>
                <Balance balance={token.balance} variant="body3Strong" units={symbol} />
                <FiatBalance light tokenUnits={symbol} balance={token.balance} token={token} units={fiat} variant="body4Strong" />
            </Col>
        </MainListCard>
    );
};

export default TokenCard;
