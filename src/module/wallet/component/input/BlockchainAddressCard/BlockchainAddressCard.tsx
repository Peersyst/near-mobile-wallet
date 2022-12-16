import { IconButton, Row } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import Typography from "module/common/component/display/Typography/Typography";
import { CopyIcon } from "module/common/icons/CopyIcon";
import { useCopyToClipboard } from "module/common/hook/useCopyToClipboard";
import { ViewStyle } from "react-native";

export interface BlockchainAddressCardProps {
    address: string;
    onCopy?: () => void;
    toastMessage?: string;
    withCopyIcon?: boolean;
    style?: ViewStyle;
}
const BlockchainAddressCard = ({ onCopy, address, withCopyIcon, toastMessage, style }: BlockchainAddressCardProps) => {
    const copyToClipboard = useCopyToClipboard();

    const handlePress = () => {
        copyToClipboard({ message: address, toastMessage });
        onCopy?.();
    };

    return (
        <Container style={{ width: "100%", ...style }}>
            <Row gap={10} justifyContent="center" alignItems="center">
                <Typography
                    style={{ maxWidth: withCopyIcon ? "90%" : "100%" }}
                    variant="body2Strong"
                    textAlign="center"
                    textTransform="uppercase"
                >
                    {address}
                </Typography>
                {withCopyIcon && (
                    <IconButton onPress={handlePress}>
                        <CopyIcon></CopyIcon>
                    </IconButton>
                )}
            </Row>
        </Container>
    );
};

export default BlockchainAddressCard;
