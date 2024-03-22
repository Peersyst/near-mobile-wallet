/* eslint-disable @typescript-eslint/no-empty-function */
import { Col, createBackdrop, ExposedBackdropProps, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import SendModal from "../SendModal/SendModal";
import AddNearModalItem from "./AddNearModalItem/AddNearModalItem";
import { ArrowReceiveIcon, BuyIcon, CircleHelpIcon } from "icons";
import ReceiveModal from "../ReceiveModal/ReceiveModal";

const AddNearModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const translate = useTranslate();
    const { showModal } = useModal();

    const handleExited = () => {
        onExited?.();
    };

    return (
        <CardNavigatorModal
            navbar={{
                title: translate("addNear").toUpperCase(),
            }}
            onExited={handleExited}
            {...rest}
        >
            <Col gap={20} justifyContent="center">
                <AddNearModalItem onPress={() => showModal(SendModal)} text={translate("buyNear")} icon={<BuyIcon />} />
                <AddNearModalItem
                    onPress={() => showModal(ReceiveModal)}
                    text={translate("depositNearFromOtherWallet")}
                    icon={<ArrowReceiveIcon />}
                />

                {/* TODO: connect with faqs */}
                <AddNearModalItem onPress={() => {}} text={translate("iNeedSupport")} icon={<CircleHelpIcon />} />
            </Col>
        </CardNavigatorModal>
    );
});

export default AddNearModal;
