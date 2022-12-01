import { Row } from "@peersyst/react-native-components";
import BlockchainAddress, { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import Chip from "module/common/component/display/Chip/Chip";
import { useTranslate } from "module/common/hook/useTranslate";

export interface AddressProps extends BlockchainAddressProps {
    imported?: boolean;
}

const Address = ({ imported, style, ...rest }: AddressProps) => {
    const translate = useTranslate();
    const maxWidth = imported ? "60%" : "80%";
    return (
        <Row style={style} gap={5}>
            <BlockchainAddress {...rest} style={{ maxWidth }} />
            {imported && <Chip label={translate("imported").toUpperCase()} variant="glass" />}
        </Row>
    );
};

export default Address;
