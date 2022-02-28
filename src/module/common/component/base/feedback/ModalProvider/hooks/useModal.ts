import { ModalContext, ModalContextType } from "../ModalContext";
import { useContext } from "react";

export interface UseModalResult {
    showModal: ModalContextType["showModal"];
    hideModal: ModalContextType["hideModal"];
    isModalActive: ModalContextType["isModalActive"];
}

export function useModal(): UseModalResult {
    const { showModal, hideModal, isModalActive } = useContext(ModalContext);
    return { showModal, hideModal, isModalActive };
}
