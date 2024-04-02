import { useWindowDimensions, View, ViewStyle } from "react-native";
import QRCodeBase from "react-native-qrcode-svg";
import { useTheme } from "@peersyst/react-native-components";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export type QRCodeStyle = ViewStyle & {
    color?: string | undefined;
};

export interface QRCodeProps {
    style?: QRCodeStyle;
}

const QRCode = ({ style = {} }: QRCodeProps): JSX.Element => {
    const { serviceInstance } = useServiceInstance();
    const { palette } = useTheme();
    const { height: screenHeight } = useWindowDimensions();
    const height = screenHeight * 0.25;

    return (
        <View testID="QRCode" style={style}>
            <QRCodeBase
                color={palette.gray[900]}
                backgroundColor={palette.background}
                value={serviceInstance?.getAddress()}
                size={height}
            />
        </View>
    );
};

export default QRCode;
