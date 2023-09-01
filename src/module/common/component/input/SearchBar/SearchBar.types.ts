import { TextFieldProps } from "../TextField/TextField.types";

export interface SearchBarProps extends Omit<TextFieldProps, "suffix" | "value"> {
    loading?: boolean;
    showLoading?: boolean;
}
