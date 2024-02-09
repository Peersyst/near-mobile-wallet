import { Col, Row } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import Typography from "module/common/component/display/Typography/Typography";
import useTranslate from "module/common/hook/useTranslate";
import Fee from "module/transaction/component/display/Fee/Fee";
import { TouchableWithoutFeedback } from "react-native";
import { useAssetSelect } from "../hook/useAssetSelect";
import { ChevronDownIcon } from "./AssetSelectDisplay.styles";
import AssetValueDisplay from "./AssetValueDisplay";

export interface AssetSelectDisplayProps {
    onPress: () => void;
}

const AssetSelectDisplay = ({ onPress }: AssetSelectDisplayProps) => {
    const translate = useTranslate();
    const { asset } = useAssetSelect();
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Container style={{ width: "100%" }}>
                <Col alignItems="center" flex={1} gap="2%">
                    <Row alignItems="center" gap={5} justifyContent="center" style={{ maxWidth: "100%" }}>
                        {asset ? (
                            <AssetValueDisplay variant="h4Strong" />
                        ) : (
                            <Typography variant="h4Strong">{translate("select_asset")}</Typography>
                        )}
                        <ChevronDownIcon />
                    </Row>
                    <Fee typographyVariant="body2" />
                </Col>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default AssetSelectDisplay;
