import CardModal from "module/common/component/feedback/CardModal/CardModal";
import { CardModalProps } from "module/common/component/feedback/CardModal/CardModal.types";
import ModalHeader from "module/common/component/navigation/ModalHeader/ModalHeader";
import useTranslate from "module/common/hook/useTranslate";
import { QuickAction } from "./QuickActionsModal.types";
import { Col } from "@peersyst/react-native-components";
import { QuickActionButton } from "./QuickActionButton/QuickActionButton";

export type QuickActionsModalProps = Omit<CardModalProps, "children"> & {
    quickActions: QuickAction[];
};

const QuickActionsModal = ({ onClose, quickActions, ...rest }: QuickActionsModalProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <>
            <CardModal {...rest} onClose={onClose}>
                {(open, setOpen) => ({
                    header: (
                        <ModalHeader
                            title={translate("actions").toUpperCase()}
                            dismissal="close"
                            onDismiss={() => {
                                setOpen(false);
                                if (open !== undefined) onClose?.();
                            }}
                        />
                    ),
                    body: (
                        <Col gap={12}>
                            {quickActions.map((quickAction, index) => (
                                <QuickActionButton key={index} quickAction={quickAction} />
                            ))}
                        </Col>
                    ),
                })}
            </CardModal>
        </>
    );
};

export default QuickActionsModal;
