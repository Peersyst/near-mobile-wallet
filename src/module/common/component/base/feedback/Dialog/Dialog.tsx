import { CommonModalComponentProps, createModal } from "../ModalProvider";
import { DialogProps } from "./Dialog.types";
import { DialogRoot, DialogTitle, DialogMessage, DialogOption } from "module/common/component/base/feedback/Dialog/Dialog.styles";
import { Col } from "../../layout/Col";
import { Row } from "module/common/component/base";
import { Pressable } from "react-native";
import { useState } from "react";

const Dialog = createModal(({ title, message, buttons, ...modalProps }: DialogProps & CommonModalComponentProps): JSX.Element => {
    const [open, setOpen] = useState(true);

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <DialogRoot open={open} onClose={closeDialog} animationIn="fadeIn" animationOut="fadeOut" {...modalProps}>
            <Col gap={14}>
                <DialogTitle>{title}</DialogTitle>
                <DialogMessage>{message}</DialogMessage>
                <Row justifyContent="flex-end" gap={20}>
                    {buttons?.map(({ text, type, onPress }, key) => (
                        <Pressable onPress={onPress || closeDialog} accessibilityRole="button" key={key}>
                            <DialogOption type={type}>{text}</DialogOption>
                        </Pressable>
                    )) || (
                        <Pressable onPress={closeDialog} accessibilityRole="button">
                            <DialogOption>OK</DialogOption>
                        </Pressable>
                    )}
                </Row>
            </Col>
        </DialogRoot>
    );
});

export default Dialog;
