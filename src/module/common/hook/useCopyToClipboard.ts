import { useToast } from "@peersyst/react-native-components";
import * as Clipboard from "expo-clipboard";
import { useTranslate } from "./useTranslate";

export interface UseCopyToClipboardParams {
    message?: string;
    toastMessage?: string;
}

export const useCopyToClipboard = () => {
    const { showToast } = useToast();
    const translate = useTranslate();
    const copyToClipboard = ({ message, toastMessage }: UseCopyToClipboardParams) => {
        /**
         * On web, this returns a promise that fulfills to a boolean value indicating whether or not
         * so in mobile it is not needed to await
         */
        Clipboard.setStringAsync(message || "");
        showToast(toastMessage ?? translate("copied_to_clipboard"), { type: "success" });
    };
    return copyToClipboard;
};
