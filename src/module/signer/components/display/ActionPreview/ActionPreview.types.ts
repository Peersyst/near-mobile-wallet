import { SvgIconProps } from "@peersyst/react-native-components";
import { JSXElementConstructor } from "react";

export type DAppPreview = {
    logoUrl: string;
    Icon: JSXElementConstructor<SvgIconProps>;
};

export interface ActionPreviewProps {
    logoUrl?: string;
    dAppPreview?: DAppPreview;
}
