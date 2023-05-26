//@ts-ignore
import TransakSDK from "@transak/react-native-sdk";
import { TransakWebViewProps } from "./TransakWebView.types";
import { memo } from "react";

function TransakWebView(props: TransakWebViewProps): JSX.Element {
    return <TransakSDK {...props} />;
}

export default memo(TransakWebView);
