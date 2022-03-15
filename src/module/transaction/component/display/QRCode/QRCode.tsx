import useRoute from "module/common/hook/useRoute";
import { useWindowDimensions } from "react-native";
import { Row } from "react-native-components";
import QRCodeBase from "react-native-qrcode-svg";

const QRCode = (): JSX.Element => {
    const { params } = useRoute();
    const { width: screenWidth } = useWindowDimensions();
    const width = screenWidth * 0.7;
    return (
        <Row justifyContent="center">
            <QRCodeBase value={params?.address} size={width} />
        </Row>
    );
};

export default QRCode;
