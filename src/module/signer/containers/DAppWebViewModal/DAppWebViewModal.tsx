import { DAppWebViewProps } from "./DAppWebViewModal.types";
import { DAppWebViewModalRoot } from "./DAppWebViewModal.styles";
import { createModal } from "@peersyst/react-native-components";
import DAppWebView from "../DAppWebView/DAppWebView";

export const DAppWebViewModal = createModal(function DAppWebViewModal({ url, name, ...restProps }: DAppWebViewProps): JSX.Element {
    return (
        <DAppWebViewModalRoot navbar={{ back: true, title: name }} {...restProps}>
            <DAppWebView source={{ uri: url }} />
        </DAppWebViewModalRoot>
    );
});
