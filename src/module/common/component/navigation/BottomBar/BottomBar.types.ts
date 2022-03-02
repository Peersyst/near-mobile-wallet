import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ReactElement } from "react";
import { IconProps, TypographyProps } from "react-native-components";
import { MainStackParamsList } from "stack-navigator";

export interface BottomBarLinkProps extends BottomTabBarProps {
    link: keyof MainStackParamsList;
    Icon: ReactElement;
    label: string;
}

export interface LinkIconProps extends IconProps {
    isActive?: boolean;
}

export interface LinkTextProps extends TypographyProps {
    isActive?: boolean;
}

export interface LogoLinkProps {
    isActive?: boolean;
}
