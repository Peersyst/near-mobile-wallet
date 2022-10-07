import { useWindowDimensions, View, ViewProps } from "react-native";
import QRCodeBase from "react-native-qrcode-svg";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { useTheme } from "@peersyst/react-native-components";

export interface QRCodeProps {
    style?: ViewProps & { color?: string };
}

const QRCode = ({ style: { color, ...style } = {} }: QRCodeProps): JSX.Element => {
    const network = useSelectedNetwork();
    const { index } = useSelectedWallet();
    const serviceInstance = serviceInstancesMap.get(index)?.[network];
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
