import { Col, Row } from "@peersyst/react-native-components";
import { TokenIcon } from "./TokenCard.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { useRecoilValue } from "recoil";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { placeholder_image } from "images";
import { Token } from "near-peersyst-sdk";
import { encodeSvg } from "utils/svg";
import { SvgXml } from "react-native-svg";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token: { metadata, balance, contractId } }: TokenCardProps): JSX.Element => {
    const { name, symbol, icon } = metadata;
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, contractId!);
    return (
        <MainListCard alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap={16}>
                {icon ? <SvgXml xml={encodeSvg(icon)} width={44} height={44} /> : <TokenIcon source={placeholder_image} />}
                <Typography variant="body3Strong" numberOfLines={1} style={{ maxWidth: "70%" }}>
                    {name}
                </Typography>
            </Row>
            <Col alignItems="flex-end" justifyContent="center" gap={2}>
                <Balance balance={balance} variant="body3Strong" units={symbol} />
                {tokenValue && <Balance action="round" light balance={tokenValue} units={fiat} variant="body4Strong" />}
            </Col>
        </MainListCard>
    );
};

export default TokenCard;
