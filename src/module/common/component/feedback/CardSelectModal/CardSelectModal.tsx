import { Row } from "@peersyst/react-native-components";
import { ChevronUpIcon } from "icons";
import { ReactElement } from "react";
import { NavbarTitle } from "../../navigation/Navbar/NavbarTitle";
import CardModal, { CardModalProps } from "../CardModal/CardModal";

export type CardSelectModalProps = Omit<CardModalProps, "children"> & {
    children: ReactElement;
    title: string;
};

const CardSelectModal = ({ children, title, ...rest }: CardSelectModalProps) => {
    return (
        <CardModal {...rest}>
            {(_open, setOpen) => ({
                header: (
                    <Row flex={1} justifyContent="center">
                        <NavbarTitle title={title} />
                        <Row style={{ position: "absolute", right: 0, top: 0 }}>
                            <ChevronUpIcon onPress={() => setOpen(false)} />
                        </Row>
                    </Row>
                ),
                body: children,
            })}
        </CardModal>
    );
};

export default CardSelectModal;
