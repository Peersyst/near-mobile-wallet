import { ReactNode } from "react";

export interface NavbarProps {
    back?: ReactNode;
    onBack?: () => unknown;
    title?: string;
    length?: number;
    index?: number;
}
