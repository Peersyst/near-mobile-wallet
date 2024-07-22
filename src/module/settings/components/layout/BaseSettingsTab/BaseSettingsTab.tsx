import { ReactNode } from "react";
import { Col } from "@peersyst/react-native-components";

export interface BaseSettingsTabProps {
    children: ReactNode;
}

export default function BaseSettingsTab({ children }: BaseSettingsTabProps) {
    return <Col gap={12}>{children}</Col>;
}
