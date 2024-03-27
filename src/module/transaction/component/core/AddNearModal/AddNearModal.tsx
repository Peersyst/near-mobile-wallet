/* eslint-disable @typescript-eslint/no-empty-function */
import { Col, createBackdrop, ExposedBackdropProps, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import SendModal from "../SendModal/SendModal";
import { ArrowReceiveIcon, BuyIcon, CircleHelpIcon } from "icons";
import ReceiveModal from "../ReceiveModal/ReceiveModal";
import AddNearModalOption from "./AddNearModalOption/AddNearModalOption";

const AddNearModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();

    const handleOnExited = () => {
        onExited?.();
    };

    return (
        <CardNavigatorModal
            navbar={{
                title: translate("addNear").toUpperCase(),
            }}
            onExited={handleOnExited}
            {...rest}
        >
            <Col gap={20} justifyContent="center">
                <AddNearModalOption onPress={() => showModal(SendModal)} text={translate("buyNear")} icon={<BuyIcon />} />
                <AddNearModalOption
                    onPress={() => showModal(ReceiveModal)}
                    text={translate("depositNearFromOtherWallet")}
                    icon={<ArrowReceiveIcon />}
                />

                {/* TODO: connect with faqs */}
                <AddNearModalOption onPress={() => {}} text={translate("iNeedSupport")} icon={<CircleHelpIcon />} />
            </Col>
        </CardNavigatorModal>
    );
});

export default AddNearModal;
