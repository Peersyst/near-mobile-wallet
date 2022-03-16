import { useWindowDimensions } from "react-native";
import { Row } from "react-native-components";
import QRCodeBase from "react-native-qrcode-svg";
import useWallet from "module/wallet/hook/useWallet";

const QRCode = (): JSX.Element => {
    const {
        state: { cells, selectedAccount },
    } = useWallet();
    const { width: screenWidth } = useWindowDimensions();
    const width = screenWidth * 0.7;
    return (
        <Row justifyContent="center" testID="QRCode">
            {selectedAccount !== undefined && <QRCodeBase value={cells[selectedAccount].address} size={width} />}
        </Row>
    );
};

export default QRCode;
