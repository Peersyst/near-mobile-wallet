import { ReactChild } from "@peersyst/react-types";
import { PropsWithChildren } from "react";
import { ActionPreviewProps } from "../../display/ActionPreview/ActionPreview.types";

export interface ActionDetailsScaffoldProps extends PropsWithChildren {
    header?: ReactChild;
    description?: ReactChild;
    showPreview?: boolean;
    previewProps?: ActionPreviewProps;
}
