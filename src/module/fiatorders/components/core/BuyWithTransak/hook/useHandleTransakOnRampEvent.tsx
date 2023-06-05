import { useToast } from "@peersyst/react-native-components";
import { TransakEvent, TransakEventHandler } from "@peersyst/react-native-transak-sdk";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import useNavigation from "module/common/hook/useNavigation";
import { useTranslate } from "module/common/hook/useTranslate";
import { FiatOrderScreens } from "module/fiatorders/components/navigation/FiatOrdersNavigatorGroup/FiatOrdersNavigatorGroup";
import useGetBalance from "module/wallet/query/useGetBalance";

export default function useHandleTransakOnRampEvent(): TransakEventHandler {
    const navigate = useNavigation().navigate;
    const { refetch } = useGetBalance();
    const { showToast } = useToast();
    const translate = useTranslate("error");

    async function handleTransakOnRampEvent(event: TransakEvent) {
        switch (event) {
            case TransakEvent.ORDER_COMPLETED:
                await refetch();
                navigate(FiatOrderScreens.BUY_SUCCESS);
                break;
            case TransakEvent.ORDER_FAILED:
                navigate(MainScreens.MAIN);
                showToast(translate("somethingWentWrong"), { type: "error" });
                break;
        }
    }

    return handleTransakOnRampEvent;
}
