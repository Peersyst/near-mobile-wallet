import { TransakEvent, TransakEventHandler } from "@peersyst/react-native-transak-sdk";
import useNavigation from "module/common/hook/useNavigation";

export default function useHandleTransakOnRampEvent(): TransakEventHandler {
    const navigate = useNavigation().navigate;

    function handleTransakOnRampEvent(event: TransakEvent, data: any) {
        switch (event) {
            case TransakEvent.ORDER_PROCESSING:
                console.log("Processing", data);
                break;
            case TransakEvent.ORDER_COMPLETED:
                console.log("Complete", data);
                break;
            case TransakEvent.ORDER_FAILED:
                console.log("Failed", data);
                break;
            case TransakEvent.ORDER_CREATED:
                console.log("created", data);
                break;
            default:
                console.log("verify", data);
        }
    }

    return handleTransakOnRampEvent;
}
