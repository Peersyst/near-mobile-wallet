import Button from "module/common/component/base/input/Button/Button"
import styled from "@peersyst/react-native-styled";
import {ButtonRootProps} from "./Button.types";

export const ButtonRoot = styled(Button,{variant: "outlined"})<ButtonRootProps>(({ theme, type }) => ({
   color: type === "dark" ? theme.palette.black : theme.palette.white,
   borderWidth: 4,
   borderColor: type === "dark" ? theme.palette.black : theme.palette.white,
   borderRadius: theme.borderRadius,
}))