import { TransakOnRampWebViewProps } from "@peersyst/react-native-transak-sdk";
import useHandleTransakOnRampEvent from "./useHandleTransakOnRampEvent";
import useTransakOnRampQueryParams from "./useTransakOnRampQueryParams";

export default function useTrasakOnRamp(): Pick<TransakOnRampWebViewProps, "queryParams" | "onTransakEventHandler"> {
    const queryParams = useTransakOnRampQueryParams();
    const handleTransakOnRampEvent = useHandleTransakOnRampEvent();
    return { queryParams, onTransakEventHandler: handleTransakOnRampEvent };
}
