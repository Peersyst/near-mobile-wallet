import { useWindowDimensions, View, ViewProps } from "react-native";
import QRCodeBase from "react-native-qrcode-svg";
import { useTheme } from "@peersyst/react-native-components";
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

export interface QRCodeProps {
    style?: ViewProps & { color?: string };
}

const QRCode = ({ style: { color, ...style } = {} }: QRCodeProps): JSX.Element => {
    const { serviceInstance } = useGetServiceInstance();
    const { palette } = useTheme();
    const { height: screenHeight } = useWindowDimensions();
    const height = screenHeight * 0.25;

    return (
        <View testID="QRCode" style={style}>
            <QRCodeBase
                color={color || palette.gray[900]}
                backgroundColor={palette.background}
                value={serviceInstance?.getAddress()}
                size={height}
            />
        </View>
    );
};

export default QRCode;
