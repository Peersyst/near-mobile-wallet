import { ReactNode } from "react";

export interface BasePageProps {
    header?: boolean;
    children?: ReactNode;
    showIcons?: boolean;
    gradient?: boolean;
}

export interface BasePageContentProps {
    header: boolean;
}
