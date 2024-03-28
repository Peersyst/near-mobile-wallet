/* eslint-disable @typescript-eslint/no-empty-function */
import { Col, createBackdrop, ExposedBackdropProps, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { ArrowReceiveIcon, BuyIcon, CircleHelpIcon } from "icons";
import ReceiveModal from "../ReceiveModal/ReceiveModal";
import AddNearModalOption from "./AddNearModalOption/AddNearModalOption";
import useNavigation from "module/common/hook/useNavigation";
import useIsBuyEnabled from "module/wallet/hook/useIsBuyEnabled";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";

export type AddNearModalProps = ExposedBackdropProps;

const AddNearModal = createBackdrop(({ ...rest }: AddNearModalProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const navigate = useNavigation();
    const showBuyOption = useIsBuyEnabled();

    function handleOnBuy() {
        navigate.navigate(MainScreens.FIAT_ORDERS);
    }

    return (
        <CardNavigatorModal
            navbar={{
                title: translate("addNear").toUpperCase(),
            }}
            {...rest}
        >
            <Col gap={20} justifyContent="center">
                {showBuyOption && <AddNearModalOption onPress={handleOnBuy} text={translate("buyNear")} icon={<BuyIcon />} />}
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
