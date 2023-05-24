//@ts-ignore
import TransakSDK from "@transak/react-native-sdk";
import { TransakWebViewProps } from "./TransakWebView.types";

export default function TransakWebView(props: TransakWebViewProps): JSX.Element {
    return <TransakSDK {...props} />;
}
