import { Row } from "@peersyst/react-native-components";
import { config } from "config";
import { ActionPreviewProps } from "./ActionPreview.types";
import { PreviewLogo, ActionPreviewRoot } from "./ActionPreview.styles";

const ActionPreview = ({ logoUrl, Icon }: ActionPreviewProps): JSX.Element => {
    return (
        <ActionPreviewRoot gap={12} justifyContent="center">
            <PreviewLogo source={{ uri: config.signerFeature.nearMobileLogoUrl }} />
            {logoUrl && Icon && (
                <Row gap={12}>
                    <Icon fontSize={32} />
                    <PreviewLogo source={{ uri: logoUrl }} />
                </Row>
            )}
        </ActionPreviewRoot>
    );
};

export default ActionPreview;
