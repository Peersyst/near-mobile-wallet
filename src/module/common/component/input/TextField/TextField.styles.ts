import styled from "@peersyst/react-native-styled";
import { InputStyle, TextField } from "@peersyst/react-native-components";
import { TextFieldRootProps, TextFieldSize } from "./TextField.types";

export const TextFieldRoot = styled(TextField)<TextFieldRootProps>(({ theme, size = "lg" }) => {
    const inputSizeStyles: Record<TextFieldSize, InputStyle> = {
        md: {
            height: 45,
            ...theme.typography.body3Strong,
        },
        lg: {
            height: 60,
            ...theme.typography.body2Strong,
        },
    };

    return {
        component: {
            input: {
                ...inputSizeStyles[size],
                placeholderColor: theme.palette.overlay["12%"],
                highlightColor: theme.palette.primary,
            },
            borderRadius: theme.borderRadiusSm,
            backgroundColor: theme.palette.background,
            color: theme.palette.text,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.overlay["12%"],
            paddingHorizontal: 20,
        },
    };
});
