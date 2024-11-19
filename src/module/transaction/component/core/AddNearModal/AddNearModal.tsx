import { Col, createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { ArrowReceiveIcon, BuyIcon, CircleHelpIcon } from "icons";
import ReceiveModal from "../ReceiveModal/ReceiveModal";
import AddNearModalOption from "./AddNearModalOption/AddNearModalOption";
import useNavigation from "module/common/hook/useNavigation";
import useIsBuyEnabled from "module/wallet/hook/useIsBuyEnabled";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { useControlled } from "@peersyst/react-hooks";
import { useState } from "react";

export type AddNearModalProps = ExposedBackdropProps;

const AddNearModal = createBackdrop(({ open: openProp, defaultOpen, onClose: onCloseProp, ...rest }: AddNearModalProps): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigation();
    const { data: showBuyOption = true } = useIsBuyEnabled();
    const [open, setOpen] = useControlled(defaultOpen, openProp, onCloseProp);
    const [openReceiveModal, setOpenReceiveModal] = useState(false);

    function handleOnBuy() {
        setOpen(false);
        navigate.navigate(MainScreens.FIAT_ORDERS);
    }

    function handleOnSupport() {
        setOpen(false);
        navigate.navigate(MainScreens.FAQS);
    }

    const handleOnClose = () => {
        setOpen(false);
    };

    const handleOnReceive = () => {
        setOpen(false);
        setOpenReceiveModal(false);
    };

    return (
        <CardNavigatorModal
            navbar={{
                title: translate("addNear").toUpperCase(),
            }}
            open={open}
            onClose={handleOnClose}
            {...rest}
        >
            <Col gap={20} justifyContent="center">
                {showBuyOption && <AddNearModalOption onPress={handleOnBuy} text={translate("buyNear")} icon={<BuyIcon />} />}
                <AddNearModalOption
                    onPress={() => setOpenReceiveModal(true)}
                    text={translate("depositNearFromOtherWallet")}
                    icon={<ArrowReceiveIcon />}
                />
                <AddNearModalOption onPress={handleOnSupport} text={translate("iNeedSupport")} icon={<CircleHelpIcon />} />
            </Col>
            <ReceiveModal open={openReceiveModal} onClose={handleOnReceive} />
        </CardNavigatorModal>
    );
});

export default AddNearModal;
