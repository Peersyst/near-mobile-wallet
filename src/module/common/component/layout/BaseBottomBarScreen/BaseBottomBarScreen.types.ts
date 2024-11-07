import { CSSProperties, ReactNode } from "react";

export interface BaseBottomBarScreenProps {
    style?: CSSProperties;
    children: ReactNode;
}

export interface BaseBottomBarScreenRootProps extends BaseBottomBarScreenProps {
    header: boolean;
    watchStatusBar: boolean;
}
