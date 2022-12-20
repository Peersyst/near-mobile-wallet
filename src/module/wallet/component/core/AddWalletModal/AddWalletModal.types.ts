import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { StepsProps } from "module/common/component/display/Steps/Steps";
import { BaseWalletWithFormScreenProps } from "module/wallet/wallet.types";
import { ReactNode } from "react";

export interface AddWalletModalProps extends ExposedBackdropProps {
    title: string;
    onBack?: () => void;
    children: (handleWalletCreation: () => Promise<void>, handleClose: () => void) => ReactNode;
    imported?: boolean;
    steps?: StepsProps;
    closeOnWalletCreation?: boolean;
}

export type BaseAddWalletModalScreenProps = BaseWalletWithFormScreenProps;

export interface AddWalletModalContentProps {
    steps: boolean;
}
