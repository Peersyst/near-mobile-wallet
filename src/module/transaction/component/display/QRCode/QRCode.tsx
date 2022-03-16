import { useWindowDimensions } from "react-native";
import { Row } from "react-native-components";
import QRCodeBase from "react-native-qrcode-svg";
import useWallet from "module/wallet/hook/useWallet";

const QRCode = (): JSX.Element => {
    const {
        state: { cells, selectedAccount },
    } = useWallet();
    const { height: screenHeight } = useWindowDimensions();
    const height = screenHeight * 0.35;
    return (
        <Row justifyContent="center" testID="QRCode">
            {selectedAccount !== undefined && <QRCodeBase value={cells[selectedAccount].address} size={height} />}
        </Row>
    );
};

export default QRCode;
