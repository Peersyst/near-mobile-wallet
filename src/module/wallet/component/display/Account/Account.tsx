import { Row } from "@peersyst/react-native-components";
import BlockchainAddress, { BlockchainAddressProps } from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import Chip from "module/common/component/display/Chip/Chip";
import { useTranslate } from "module/common/hook/useTranslate";

export interface AccountProps extends Omit<BlockchainAddressProps, "type" | "copy"> {
    imported?: boolean;
}

const Account = ({ imported, style, ...rest }: AccountProps) => {
    const translate = useTranslate();

    return (
        <Row style={{ maxWidth: "100%", ...style }} gap={"2%"}>
            <BlockchainAddress {...rest} type="address" style={{ maxWidth: imported ? "60%" : "100%" }} />
            {imported && <Chip label={translate("imported").toUpperCase()} variant="glass" size="sm" />}
        </Row>
    );
};

export default Account;
