import { useConfig, useTheme } from "@peersyst/react-native-components";
import { TransakOnRampQueryParams } from "@peersyst/react-native-transak-sdk";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

export default function useTransakOnRampQueryParams(): TransakOnRampQueryParams {
    const { account } = useSelectedWallet();
    const { palette } = useTheme();
    const transakConfig = useConfig("transak");

    return {
        walletAddress: account,
        themeColor: palette.primary,
        ...transakConfig,
    };
}
