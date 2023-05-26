import { TransakProduct } from "../Transak.types";
import TransakWebView from "../TransakWebView/TransakWebView";
import { TransakOffRampWebViewProps } from "./TransakOffRampWebView.types";

export default function TransakOffRampWebView({ queryParams, ...rest }: TransakOffRampWebViewProps): JSX.Element {
    return (
        <TransakWebView
            queryParams={{
                productsAvailed: TransakProduct.SELL,
                ...queryParams,
            }}
            {...rest}
        />
    );
}
