import { ExposedBackdropProps, createModal, Col } from "@peersyst/react-native-components";
import { Action } from "near-peersyst-sdk";
import ActionDetailsModalHeader from "./ActionDetailsModalHeader";
import { ActionDetailsModalRoot } from "./ActionDetailsModal.styles";
import ActionDetailsModalBody from "./ActionDetailsModalBody/ActionDetailsModalBody";

export interface ActionDetailsModalProps extends ExposedBackdropProps {
    action: Action;
}

const ActionDetailsModal = createModal(({ action, ...rest }: ActionDetailsModalProps) => {
    return (
        <ActionDetailsModalRoot {...rest}>
            <Col flex={1} gap={20}>
                <ActionDetailsModalHeader action={action} />
                <ActionDetailsModalBody action={action} />
            </Col>
        </ActionDetailsModalRoot>
    );
});

export default ActionDetailsModal;
