import { Col, CopyButton, Row, useToast } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import * as Clipboard from "expo-clipboard";
import { useTranslate } from "module/common/hook/useTranslate";

export interface BlockchainAddressCardProps {
    address: string;
    onCopy?: () => void;
    mainButton?: boolean;
}
const BlockchainAddressCard = ({ onCopy, address, mainButton }: BlockchainAddressCardProps) => {
    const { showToast } = useToast();
    const translate = useTranslate();

    const copyToClipboard = () => {
        Clipboard.setStringAsync(address || "");
        showToast(translate("address_copied"), { type: "success" });
        onCopy?.();
    };

    return (
        <Col gap={24} style={{ width: "100%" }}>
            <Container>
                <Row gap={10} justifyContent="center" alignItems="center">
                    <Typography style={{ maxWidth: "90%" }} variant="body2Strong" textAlign="center" textTransform="uppercase">
                        {address}
                    </Typography>
                    {!mainButton && <CopyButton text={address} message={translate("copied_to_clipboard")} />}
                </Row>
            </Container>
            {mainButton && (
                <Button variant="primary" fullWidth onPress={copyToClipboard}>
                    {translate("copy")}
                </Button>
            )}
        </Col>
    );
};

export default BlockchainAddressCard;
