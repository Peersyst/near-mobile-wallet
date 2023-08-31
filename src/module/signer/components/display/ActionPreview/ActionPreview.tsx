import { Row } from "@peersyst/react-native-components";
import { config } from "config";
import { ActionPreviewProps } from "./ActionPreview.types";
import { PreviewLogo, ActionPreviewRoot, ActionPreviewIcon } from "./ActionPreview.styles";
import NearMobileLogo from "../NearMobileLogo/NearMobileLogo";

const ActionPreview = ({ logoUrl, Icon }: ActionPreviewProps): JSX.Element => {
    return (
        <ActionPreviewRoot gap={12} justifyContent="center" alignItems="center">
            <NearMobileLogo />
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
