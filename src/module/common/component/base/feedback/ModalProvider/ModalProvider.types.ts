import { ComponentType, ReactNode } from "react";

export interface ModalProviderProps {
    children?: ReactNode;
}

export type ModalState = Modal[];

export type ModalWithId<T extends CommonModalComponentProps = CommonModalComponentProps> = ComponentType<T> & { id: string };

export interface Modal<T extends CommonModalComponentProps = CommonModalComponentProps> {
    Modal: ModalWithId<T>;
    props: T;
}

export enum ModalActionType {
    SHOW_MODAL,
    HIDE_MODAL,
    REMOVE_MODAL,
}

export interface ShowModalAction {
    type: ModalActionType.SHOW_MODAL;
    payload: Modal;
}

export interface HideModalAction {
    type: ModalActionType.SHOW_MODAL;
    payload: string;
}

export interface RemoveModalAction {
    type: ModalActionType.REMOVE_MODAL;
    payload: string;
}

export type ModalAction = {
    type: ModalActionType;
    payload: Modal | string;
};

export interface CommonModalComponentProps {
    /**
     * Component is open
     */
    open?: boolean;
    /**
     * onClose handler
     */
    onClose?: () => unknown;
    /**
     * onExited handler
     */
    onExited?: () => unknown;
}
