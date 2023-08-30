import { ReactElement } from "react";
import { CriticalIcon, ForbiddenIcon, InfoIcon } from "./PermissionField.styles";

export type PermissionFieldType = "info" | "critical" | "forbidden";

export interface PermissionFieldProps {
    label: string;
    type: PermissionFieldType;
}

export const PermissionIcons: Record<PermissionFieldType, ReactElement> = {
    info: <InfoIcon />,
    critical: <CriticalIcon />,
    forbidden: <ForbiddenIcon />,
};
