import { Row } from "@peersyst/react-native-components";
import BlockchainAddress, { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";

const Account = ({ style, ...rest }: Omit<BlockchainAddressProps, "type" | "copy">) => {
    return (
        <Row style={{ maxWidth: "100%", ...style }} gap={"2%"}>
            <BlockchainAddress {...rest} type="address" />
        </Row>
    );
};

export default Account;
