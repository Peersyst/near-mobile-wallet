import { ReactElement } from "react";
import ModalHeader from "../../navigation/ModalHeader/ModalHeader";
import { ModalHeaderDismissal } from "../../navigation/ModalHeader/ModalHeader.types";
import CardModal from "../CardModal/CardModal";
import { CardModalProps } from "../CardModal/CardModal.types";

export type CardSelectModalProps = Omit<CardModalProps, "children"> & {
    children: ReactElement;
    title: string;
    dismissal: ModalHeaderDismissal;
};

const CardSelectModal = ({ children, title, dismissal, onClose, ...rest }: CardSelectModalProps): JSX.Element => {
    return (
        <CardModal {...rest} onClose={onClose}>
            {(open, setOpen) => ({
                header: (
                    <ModalHeader
                        title={title}
                        dismissal={dismissal}
                        onDismiss={() => {
                            setOpen(false);
                            if (open !== undefined) onClose?.();
                        }}
                    />
                ),
                body: children,
            })}
        </CardModal>
    );
};

export default CardSelectModal;
