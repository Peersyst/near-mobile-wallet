import { createContext } from "react";
import { CommonModalComponentProps, ModalState, ModalWithId } from "./ModalProvider.types";

export interface ModalContextType {
    showModal: <T extends CommonModalComponentProps = CommonModalComponentProps>(Modal: ModalWithId<T>, props?: T) => void;
    hideModal: (name: string) => void;
    removeModal: (name: string) => void;
    isModalActive: (name: string) => boolean;
    modals: ModalState;
}

const defaultValue: ModalContextType = {
    showModal: () => undefined,
    hideModal: () => undefined,
    removeModal: () => undefined,
    isModalActive: () => false,
    modals: [],
};

export const ModalContext = createContext<ModalContextType>(defaultValue);
export const ModalConsumer = ModalContext.Consumer;
