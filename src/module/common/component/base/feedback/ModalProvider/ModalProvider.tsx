import { ModalContext, ModalContextType } from "./ModalContext";
import { useModalReducer } from "./hooks/useModalReducer";
import { ModalActionType, ModalProviderProps, ModalWithId } from "./ModalProvider.types";
import { ModalManager } from "./ModalManager/ModalManager";

export default function ModalProvider({ children }: ModalProviderProps): JSX.Element {
    const [state, dispatch] = useModalReducer();

    const providerValue: ModalContextType = {
        showModal: (Modal, props) =>
            dispatch({
                type: ModalActionType.SHOW_MODAL,
                payload: {
                    Modal: Modal as ModalWithId,
                    props: props || {},
                },
            }),
        hideModal: (id) => dispatch({ type: ModalActionType.HIDE_MODAL, payload: id }),
        removeModal: (id) => dispatch({ type: ModalActionType.REMOVE_MODAL, payload: id }),
        isModalActive: (id) => state.some(({ Modal }) => Modal.id === id),
        modals: state,
    };

    return (
        <ModalContext.Provider value={providerValue}>
            <ModalManager />
            {children}
        </ModalContext.Provider>
    );
}
