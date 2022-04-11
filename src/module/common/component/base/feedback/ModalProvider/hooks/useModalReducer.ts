import { Reducer, useReducer } from "react";
import { HideModalAction, ModalAction, ModalActionType, ModalState, RemoveModalAction, ShowModalAction } from "../ModalProvider.types";

const modalIsActive = (state: ModalState, name: string) => state.some(({ Modal }) => Modal.id === name);

const reducer = (state: ModalState, action: ModalAction): ModalState => {
    switch (action.type) {
        case ModalActionType.SHOW_MODAL:
            return modalIsActive(state, (action as ShowModalAction).payload.Modal.id as string)
                ? state
                : (state = [(action as ShowModalAction).payload]);
        case ModalActionType.HIDE_MODAL:
            return state.map((modalState) => {
                if (modalState.Modal.id === (action as HideModalAction).payload) modalState.props.open = false;
                return modalState;
            });
        case ModalActionType.REMOVE_MODAL:
            return state.filter(({ Modal }) => Modal.id !== (action as RemoveModalAction).payload);
        default:
            return state;
    }
};

export function useModalReducer() {
    return useReducer<Reducer<ModalState, ModalAction>>(reducer, []);
}
