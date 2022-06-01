import { TextInput } from "react-native";
import { Row } from "../../layout/Row";
import { Icon } from "../../display/Icon";
import { InputProps } from "./TextInput.types";
import styled, { styledWithAs } from "@peersyst/react-native-styled";

export const Input = styledWithAs(TextInput)<InputProps>(({ multiline = false, numberOfLines = 1 }) => ({
    flex: 1,
    height: multiline ? numberOfLines * 20 : 40,
    textAlignVertical: multiline ? "top" : "center",
    paddingTop: multiline ? 10 : 0,
}));

export const TextInputRoot = styled(Row, { alignItems: "center", gap: 10 })(({ theme }) => ({
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.text,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 15,
}));

export const InvalidIcon = styled(Icon)(({ theme }) => ({ color: theme.palette.status.error }));
export const ValidIcon = styled(Icon)(({ theme }) => ({ color: theme.palette.status.success }));
