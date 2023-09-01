import { ReactElement } from "react";
import { CriticalIcon, ForbiddenIcon, AllowedIcon } from "./PermissionField.styles";
import { PermissionFieldType } from "./PermissionField.types";

export const PermissionIcons: Record<PermissionFieldType, ReactElement> = {
    allowed: <AllowedIcon />,
    critical: <CriticalIcon />,
    forbidden: <ForbiddenIcon />,
};
