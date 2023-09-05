import { Row } from "@peersyst/react-native-components";
import { config } from "config";
import { ActionPreviewProps } from "./ActionPreview.types";
import { PreviewLogo, ActionPreviewRoot, ActionPreviewIcon } from "./ActionPreview.styles";
import NearMobileLogo from "../NearMobileLogo/NearMobileLogo";

const ActionPreview = (props: ActionPreviewProps): JSX.Element => {
    const { dAppPreview, logoUrl } = props;

    return (
        <ActionPreviewRoot gap={12} justifyContent="center" alignItems="center">
            {logoUrl ? (
                <PreviewLogo source={{ uri: logoUrl }} fallback={{ uri: config.signerFeature.dAppLogoFallback }} />
            ) : (
                <NearMobileLogo />
            )}
            {dAppPreview && (
                <Row gap={12} justifyContent="center" alignItems="center">
                    <ActionPreviewIcon>
                        <dAppPreview.Icon />
                    </ActionPreviewIcon>
                    <PreviewLogo source={{ uri: dAppPreview.logoUrl }} fallback={{ uri: config.signerFeature.dAppLogoFallback }} />
                </Row>
            )}
        </ActionPreviewRoot>
    );
};

export default ActionPreview;
