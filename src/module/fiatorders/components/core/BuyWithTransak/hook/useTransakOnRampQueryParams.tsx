import { useTheme } from "@peersyst/react-native-components";
import { SupportedPaymentMethods, TransakEnviroment, TransakOnRampQueryParams } from "@peersyst/react-native-transak-sdk";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { Platform } from "react-native";
import { config } from "refactor/common/config";

export default function useTransakOnRampQueryParams(): TransakOnRampQueryParams {
    const { account } = useSelectedWallet();
    const { palette } = useTheme();

    return {
        ...config.transak,
        environment: config.transak.environment as TransakEnviroment,
        walletAddress: account,
        themeColor: palette.primary.replace("#", ""),
        ...(Platform.OS !== "ios" && { disablePaymentMethods: SupportedPaymentMethods.APPLE_PAY }),
    };
}
