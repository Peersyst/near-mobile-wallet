import Container from "module/common/component/display/Container/Container";
import { BlockchainAddressCardProps } from "./BlockchainAddressCard.types";
import { CenteredBlockchainAddress } from "./BlockchainAddressCard.styles";
import { Row } from "@peersyst/react-native-components";

const BlockchainAddressCard = ({ style, ...rest }: BlockchainAddressCardProps) => {
    return (
        <Container style={{ width: "100%", ...style }}>
            <Row flex={1} justifyContent="center">
                <CenteredBlockchainAddress type="address" variant="body2Strong" {...rest} />
            </Row>
        </Container>
    );
};

export default BlockchainAddressCard;
