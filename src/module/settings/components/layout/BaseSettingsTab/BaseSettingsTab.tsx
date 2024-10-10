import { ReactNode } from "react";
import { BaseSettingsTabRoot } from "./BaseSettingsTab.styles";

export interface BaseSettingsTabProps {
    children: ReactNode;
}

export default function BaseSettingsTab({ children }: BaseSettingsTabProps) {
    return <BaseSettingsTabRoot gap={12}>{children}</BaseSettingsTabRoot>;
}
