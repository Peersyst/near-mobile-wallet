import Button from "module/common/component/base/input/Button/Button"
import styled from "@peersyst/react-native-styled";

export const ButtonRoot = styled(Button,{variant: "outlined"})(({ theme }) => ({
   color: theme.palette.black,
   borderWidth: 4,
   borderColor: "red",
   borderRadius: theme.borderRadius,
}))