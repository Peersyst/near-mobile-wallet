import { SelectProps, TypographyProps } from "@peersyst/react-native-components";

export type TokenSelectorProps = Partial<Pick<TypographyProps, "variant">> &
    Omit<SelectProps<string>, "value" | "onChange" | "display" | "defaultValue" | "label" | "renderValue" | "multiple" | "name"> & {
        defaultToken?: string;
        token?: string;
        tokens: string[];
        onTokenChange?: (token: string) => void;
    };

export interface TokenSelectorRootProps {
    variant: TypographyProps["variant"];
}
