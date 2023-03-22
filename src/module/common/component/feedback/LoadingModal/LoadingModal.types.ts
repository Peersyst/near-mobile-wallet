import { ExposedBackdropProps } from "@peersyst/react-native-components";

export interface LoadingModalProps extends Omit<ExposedBackdropProps, "closable" | "animationIn" | "animationOut"> {
    loading: boolean;
    success: boolean;
    successMessage?: string;
    processingMessage?: string;
    error: boolean;
}
