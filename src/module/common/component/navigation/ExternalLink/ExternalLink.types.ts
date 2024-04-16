import { TypographyProps } from "@peersyst/react-native-components";

export interface ExternalLinkProps extends Omit<TypographyProps, "children" | "onPress"> {
    to?: string;
    children: string;
}
