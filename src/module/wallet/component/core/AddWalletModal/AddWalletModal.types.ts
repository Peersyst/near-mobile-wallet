import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { BaseWalletWithFormScreenProps } from "module/wallet/wallet.types";
import { ReactNode } from "react";

export type AddWalletModalProps = ExposedBackdropProps &
    Pick<CardNavigatorModalProps, "navbar"> & {
        children: ReactNode;
    };

export type BaseAddWalletModalScreenProps = BaseWalletWithFormScreenProps;

export interface AddWalletModalContentProps {
    steps: boolean;
}
