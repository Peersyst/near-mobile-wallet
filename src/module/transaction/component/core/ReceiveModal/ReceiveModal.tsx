import { BackdropProps, Col, createBackdrop } from "react-native-components";
import { translate } from "locale";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import QRCode from "module/transaction/component/display/QRCode/QRCode";
import ReceiveCard from "module/transaction/component/display/ReceiveCard/ReceiveCard";

const ReceiveModal = createBackdrop((props: BackdropProps) => (
    <GlassNavigatorModal navbar={{ back: true, title: translate("receive") }} {...props}>
        <Col gap={"10%"} flex={1} >
            <QRCode />
            <ReceiveCard />
        </Col>
    </GlassNavigatorModal>
));

export default ReceiveModal;
