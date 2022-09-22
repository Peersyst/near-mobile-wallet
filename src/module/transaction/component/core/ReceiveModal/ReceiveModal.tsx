import { Col, createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import { translate } from "locale";
import MainNavigatorModal from "module/common/component/navigation/MainNavigatorModal/MainNavigatorModal";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import ReceiveCard from "module/transaction/component/display/ReceiveCard/ReceiveCard";

const ReceiveModal = createBackdrop((props: ExposedBackdropProps) => (
    <MainNavigatorModal navbar={{ back: true, title: translate("receive") }} {...props}>
        <Col gap={"5%"} flex={1}>
            <QRCode />
            <ReceiveCard />
        </Col>
    </MainNavigatorModal>
));

export default ReceiveModal;
