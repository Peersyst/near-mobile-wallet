import { ChevronUpIcon } from "icons";
import { ReactElement } from "react";
import { NavbarTitle } from "../../navigation/Navbar/NavbarTitle";
import CardModal, { CardModalProps } from "../CardModal/CardModal";
import { CardSelectModalNavbar, ChevronUpIconRoot } from "./CardSelectModal.styles";

export type CardSelectModalProps = Omit<CardModalProps, "children"> & {
    children: ReactElement;
    title: string;
};

const CardSelectModal = ({ children, title, onClose, ...rest }: CardSelectModalProps) => {
    return (
        <CardModal {...rest} onClose={onClose}>
            {(open, setOpen) => ({
                header: (
                    <CardSelectModalNavbar>
                        <NavbarTitle title={title} />
                        <ChevronUpIconRoot>
                            <ChevronUpIcon
                                onPress={() => {
                                    setOpen(false);
                                    if (open !== undefined) onClose?.();
                                }}
                            />
                        </ChevronUpIconRoot>
                    </CardSelectModalNavbar>
                ),
                body: children,
            })}
        </CardModal>
    );
};

export default CardSelectModal;
