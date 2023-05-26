import { TransakProduct } from "../Transak.types";
import TransakWebView from "../TransakWebView/TransakWebView";
import { TransakOnRampWebViewProps } from "./TransakOnRampWebView.types";

export default function TransakOnRampWebView({ queryParams, ...rest }: TransakOnRampWebViewProps): JSX.Element {
    return (
        <TransakWebView
            queryParams={{
                productsAvailed: TransakProduct.BUY,
                ...queryParams,
            }}
            {...rest}
        />
    );
}
