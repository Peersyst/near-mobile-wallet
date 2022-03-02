import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { MainStackParamsList } from "stack-navigator";

export interface BottomBarLinkProps {
    link: keyof MainStackParamsList;
    Icon: ReactElement;
    label: string;
}