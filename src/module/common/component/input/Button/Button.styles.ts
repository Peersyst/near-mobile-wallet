import { Button } from "react-native-components";
import styled from "@peersyst/react-native-styled";
import { ButtonRootProps, ButtonProps } from "./Button.types";
import {StyleSheet} from "react-native";

export const ButtonRoot = styled(Button, { variant: "outlined", size: "lg", fullWidth: true })<ButtonRootProps>(({ theme, type }) => ({
   color: theme.palette.black,
   borderWidth: 4,
   borderColor: theme.palette.black,
   borderRadius: theme.borderRadius,
}))

