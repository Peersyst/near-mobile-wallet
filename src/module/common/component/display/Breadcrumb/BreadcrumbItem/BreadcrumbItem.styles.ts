import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";
import { ActiveProps } from "../Breadcrumb.types";
import { getLuminance } from "@peersyst/react-utils";

export const BreadcrumbItemRoot = styled(View)<ActiveProps>(({ active, theme }) => ({
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: active ? 0 : 2,
    backgroundColor: active ? theme.palette.primary : "transparent",
    borderColor: active ? undefined : theme.palette.disabled,
    alignItems: "center",
    justifyContent: "center",
}));

export const BreadcrumbNumber = styled(Text)<ActiveProps>(({ active, theme }) => ({
    fontSize: 11,
    color: active ? (getLuminance(theme.palette.disabled) > 0.5 ? theme.palette.black : theme.palette.white) : theme.palette.disabled,
}));
