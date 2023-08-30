import { Row } from "@peersyst/react-native-components";
import { config } from "config";
import { ActionPreviewProps } from "./ActionPreview.types";
import { PreviewLogo, ActionPreviewRoot, ActionPreviewIcon } from "./ActionPreview.styles";

const ActionPreview = ({ logoUrl, Icon }: ActionPreviewProps): JSX.Element => {
    return (
        <ActionPreviewRoot gap={12} justifyContent="center" alignItems="center">
            <PreviewLogo source={{ uri: config.signerFeature.nearMobileLogoUrl }} />
            {logoUrl && Icon && (
                <Row gap={12} justifyContent="center" alignItems="center">
                    <ActionPreviewIcon as={Icon} />
                    <PreviewLogo source={{ uri: logoUrl }} fallback={{ uri: config.signerFeature.dAppLogoFallback }} />
                </Row>
            )}
        </ActionPreviewRoot>
    );
};

export default ActionPreview;
