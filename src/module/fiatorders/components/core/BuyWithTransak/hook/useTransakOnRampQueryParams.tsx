import { useConfig, useTheme } from "@peersyst/react-native-components";
import { SupportedPaymentMethods, TransakEnviroment, TransakOnRampQueryParams } from "@peersyst/react-native-transak-sdk";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { Platform } from "react-native";

export default function useTransakOnRampQueryParams(): TransakOnRampQueryParams {
    const { account } = useSelectedWallet();
    const { palette } = useTheme();
    const transakConfig = useConfig("transak");

    return {
        walletAddress: account,
        themeColor: palette.primary,
        ...transakConfig,
        environment: transakConfig.environment as TransakEnviroment,
        disablePaymentMethods: Platform.OS !== "ios" ? SupportedPaymentMethods.APPLE_PAY : undefined,
    };
}
