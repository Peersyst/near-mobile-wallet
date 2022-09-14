import { IconButtonProps, IconButtonStyles } from "@peersyst/react-native-components";

export interface CopyButtonProps extends Omit<IconButtonProps, "children" | "onPress"> {
    text: string;
    style?: IconButtonStyles;
    message?: string;
}
