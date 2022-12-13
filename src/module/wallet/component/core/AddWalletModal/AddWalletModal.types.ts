import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { StepsProps } from "module/common/component/display/Steps/Steps";
import { ReactNode } from "react";

export interface AddWalletModalProps extends ExposedBackdropProps {
    title: string;
    onBack?: () => void;
    children: (handleWalletCreation: () => Promise<void>, handleClose: () => void) => ReactNode;
    imported?: boolean;
    steps?: StepsProps;
}

export interface BaseAddWalletModalScreenProps {
    onSubmit: () => void;
    submitText?: string;
}

export interface AddWalletModalContentProps {
    steps: boolean;
}
