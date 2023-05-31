import { TransakOnRampWebViewProps } from "@peersyst/react-native-transak-sdk";
import useTransakOnRampQueryParams from "./useTransakOnRampQueryParams";

export default function useTrasakOnRamp(): Pick<TransakOnRampWebViewProps, "queryParams"> {
    const queryParams = useTransakOnRampQueryParams();
    return { queryParams };
}
