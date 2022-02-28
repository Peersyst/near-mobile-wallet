import { ReactNode, useContext } from "react";
import { ModalContext } from "../ModalContext";

export function useModalState(): ReactNode[] {
    const { modals, removeModal } = useContext(ModalContext);

    return modals.map(({ Modal, props: { onExited, ...rest } }, i) => {
        return (
            <Modal
                {...rest}
                key={i.toString()}
                onExited={() => {
                    onExited?.();
                    removeModal(Modal.id);
                }}
            />
        );
    });
}
