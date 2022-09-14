import { BlockchainAddressProps } from "./BlockchainAddress.types";
import { formatHash } from "@peersyst/react-utils";
import { Row } from "../../layout/Row";
import { Typography } from "../../display/Typography";
import CopyButton from "module/common/component/base/util/CopyButton/CopyButton";
import { TouchableOpacity } from "react-native";
import { extractTextStyles } from "utils/extractTextStyles";

const BlockchainAddress = ({ address, ellipsis, length, style, variant, ...typographyProps }: BlockchainAddressProps): JSX.Element => {
    const [textStyle, rootStyle] = extractTextStyles(style);
    const copyFontSize = (textStyle.fontSize ? textStyle.fontSize : 16) + 4;

    return (
        <Row alignItems="center" gap={10} style={rootStyle}>
            <TouchableOpacity onPress={() => undefined}>
                <Typography numberOfLines={1} style={textStyle} variant={variant} {...typographyProps}>
                    {formatHash(address, ellipsis, length)}
                </Typography>
            </TouchableOpacity>
            <CopyButton text={address} message={"A"} style={{ ...textStyle, fontSize: copyFontSize }} />
        </Row>
    );
};

export default BlockchainAddress;
