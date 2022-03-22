import { BackdropProps } from "react-native-components";

export interface LoadingModalProps extends Omit<BackdropProps, "children" | "closable" | "transparent"> {
    loading: boolean;
    success: boolean;
    successMessage?: string;
    error: boolean;
}
