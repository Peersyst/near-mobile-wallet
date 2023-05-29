import { ExposedBackdropProps, createModal, Col } from "@peersyst/react-native-components";
import { Action } from "near-peersyst-sdk";
import ActionDetailsModalHeader from "./ActionDetailsModalHeader/ActionDetailsModalHeader";
import Container from "module/common/component/display/Container/Container";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { useControlled } from "@peersyst/react-hooks";
import ActionDetailsModalFooter from "./ActionDetailsModalFooter/ActionDetailsModalFooter";
import ActionDetailsModalBody from "./ActionDetailsModalBody/ActionDetailsModalBody";

export interface ActionDetailsModalProps extends ExposedBackdropProps {
    action: Action;
}

const ActionDetailsModal = createModal(({ action, defaultOpen, open: openProp, onClose, ...rest }: ActionDetailsModalProps) => {
    const translate = useTranslate();
    const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);

    return (
        <CardNavigatorModal
            navbar={{
                back: true,
                title: translate("actionDetails"),
                onBack: () => setOpen(false),
            }}
            open={open}
            onClose={() => setOpen(false)}
            {...rest}
        >
            <Col gap={30}>
                <Container style={{ paddingVertical: 24 }}>
                    <Col flex={1} gap={24}>
                        <ActionDetailsModalHeader action={action} />
                        <ActionDetailsModalBody action={action} />
                    </Col>
                </Container>
                <ActionDetailsModalFooter action={action} />
            </Col>
        </CardNavigatorModal>
    );
});

export default ActionDetailsModal;
