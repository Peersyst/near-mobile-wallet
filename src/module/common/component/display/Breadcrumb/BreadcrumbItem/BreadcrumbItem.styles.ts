import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";
import { ActiveProps } from "../Breadcrumb.types";

export const BreadcrumbItemRoot = styled(View)<ActiveProps>(({ active, theme }) => ({
    height: active ? 20 : 18,
    width: active ? 20 : 18,
    borderRadius: 50,
    borderWidth: active ? 0 : 2,
    backgroundColor: active ? theme.palette.black : theme.palette.white,
    borderColor: active ? undefined : theme.palette.gray300,
    alignItems: "center",
    justifyContent: "center"
}));

export const BreadcrumbNumber = styled(Text)<ActiveProps>(({ active, theme }) => ({
    fontSize: 11,
    color: active ? theme.palette.white : theme.palette.gray300,
    marginTop: -1,
}));
