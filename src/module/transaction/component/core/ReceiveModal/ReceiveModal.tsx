import { Col, createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import MainNavigatorModal from "module/common/component/navigation/MainNavigatorModal/MainNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import ReceiveCard from "module/transaction/component/display/ReceiveCard/ReceiveCard";

const ReceiveModal = createBackdrop((props: ExposedBackdropProps) => {
    const t = useTranslate();
    return (
        <MainNavigatorModal navbar={{ back: true, title: t("receive") }} {...props}>
            <Col gap={"5%"} flex={1}>
                <QRCode />
                <ReceiveCard />
            </Col>
        </MainNavigatorModal>
    );
});

export default ReceiveModal;
