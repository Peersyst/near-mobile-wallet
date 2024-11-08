import { CSSProperties, ReactNode } from "react";

export interface BasePageContentProps {
    style?: CSSProperties;
    children: ReactNode;
    header?: boolean;
    watchStatusBar?: boolean;
}

export interface BasePageContentRootProps extends BasePageContentProps {
    header: boolean;
    watchStatusBar: boolean;
}
