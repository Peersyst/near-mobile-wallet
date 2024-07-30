import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ReactNode } from "react";
import CardModal from "../../feedback/CardModal/CardModal";
import Navbar from "../Navbar/Navbar";
import { NavbarProps } from "../Navbar/Navbar.types";
import { CardModalProps } from "../../feedback/CardModal/CardModal.types";

export type CardNavigatorModalProps = ExposedBackdropProps & {
    navbar?: NavbarProps;
    children: ReactNode;
    style?: CardModalProps["style"];
    index?: number;
};

const CardNavigatorModal = ({
    navbar: { back, onBack, ...restNavProps } = {},
    children,
    open,
    closable = true,
    onClose,
    ...backdropProps
}: CardNavigatorModalProps): JSX.Element => {
    return (
        <CardModal closable={closable} onClose={onClose} {...backdropProps} open={open}>
            {(open, setOpen) => ({
                header: (
                    <Navbar
                        back={back && closable}
                        onBack={
                            onBack ||
                            (() => {
                                setOpen(false);
                                if (open !== undefined) onClose?.();
                            })
                        }
                        {...restNavProps}
                    />
                ),
                body: children,
            })}
        </CardModal>
    );
};

export default CardNavigatorModal;
