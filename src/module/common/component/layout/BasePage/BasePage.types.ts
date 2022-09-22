import { ReactNode } from "react";

export interface BasePageProps {
    header?: boolean;
    appearance?: string;
    children?: ReactNode;
    showIcons?: boolean;
    gradient?: boolean;
}

export interface BasePageContentProps {
    header: boolean;
}
