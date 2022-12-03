import { Row } from "@peersyst/react-native-components";
import BlockchainAddress, { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import Chip from "module/common/component/display/Chip/Chip";
import { useTranslate } from "module/common/hook/useTranslate";

export interface AddressProps extends BlockchainAddressProps {
    imported?: boolean;
}

const Address = ({ imported, style, ...rest }: AddressProps) => {
    const translate = useTranslate();

    return (
        <Row style={{ maxWidth: "100%", ...style }} gap={"3%"}>
            <BlockchainAddress {...rest} style={{ maxWidth: imported ? "60%" : "100%" }} />
            {imported && <Chip label={translate("imported").toUpperCase()} variant="glass" />}
        </Row>
    );
};

export default Address;
