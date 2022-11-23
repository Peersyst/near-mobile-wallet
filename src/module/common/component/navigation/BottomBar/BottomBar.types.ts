import { ReactElement, ReactNode } from "react";
import { IconProps, TypographyProps } from "@peersyst/react-native-components";
import { MainStackParamsList } from "stack-navigator";

export interface BottomBarLinkProps {
    link: keyof MainStackParamsList;
    isActive: boolean;
    children?: ReactNode;
}

export interface BottomBarItemProps {
    onPress: () => void;
    isActive: boolean;
    Icon: ReactElement;
    label: string;
}

export interface LinkItemIconProps extends IconProps {
    isActive?: boolean;
}

export interface LinkTextProps extends TypographyProps {
    isActive?: boolean;
}
