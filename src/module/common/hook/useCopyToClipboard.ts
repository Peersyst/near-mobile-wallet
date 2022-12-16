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
        Clipboard.setStringAsync(message || "");
        showToast(toastMessage ?? translate("copied_to_clipboard"), { type: "success" });
    };
    return copyToClipboard;
};
