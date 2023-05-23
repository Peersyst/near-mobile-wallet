import Container from "module/common/component/display/Container/Container";
import { BlockchainAddressCardProps } from "./BlockchainAddressCard.types";
import { CenteredBlockchainAddress } from "./BlockchainAddressCard.styles";

const BlockchainAddressCard = ({ style, ...rest }: BlockchainAddressCardProps) => {
    return (
        <Container style={{ width: "100%", ...style }}>
            <CenteredBlockchainAddress type="address" variant="body2Strong" {...rest} />
        </Container>
    );
};

export default BlockchainAddressCard;
