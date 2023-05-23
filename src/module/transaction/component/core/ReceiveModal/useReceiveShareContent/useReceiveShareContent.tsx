import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";
import { ShareContent } from "react-native";

export default function useReceiveShareContent(address: string): ShareContent {
    const translate = useTranslate();
    return {
        url: config.nearMobileUrl,
        title: translate("shareYourNearAddress"),
        message: translate("shareYourNearAddressMessage", { address }),
    };
}
