import { Row } from "@peersyst/react-native-components";
import { Token } from "near-peersyst-sdk";
import TokenIcon from "../TokenIcon/TokenIcon";
import Typography from "module/common/component/display/Typography/Typography";

export interface TokenHeaderProps {
    token: Token;
}

const TokenHeader = ({ token }: TokenHeaderProps): JSX.Element => {
    const { name } = token.metadata;

    return (
        <Row alignItems="center" gap={16}>
            <TokenIcon token={token} />
            <Typography variant="body3Strong" numberOfLines={1} style={{ flex: 0.6 }}>
                {name}
            </Typography>
        </Row>
    );
};

export default TokenHeader;
