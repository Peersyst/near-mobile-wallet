import { useWindowDimensions } from "react-native";
import { Row } from "react-native-components";
import QRCodeBase from "react-native-qrcode-svg";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

const QRCode = (): JSX.Element => {
    const { serviceInstance } = useSelectedWallet();
    const { height: screenHeight } = useWindowDimensions();
    const height = screenHeight * 0.35;
    return (
        <Row justifyContent="center" testID="QRCode">
            <QRCodeBase value={serviceInstance?.getAddress()} size={height} />
        </Row>
    );
};

export default QRCode;
