import { TransakOffRampQueryParams } from "../Transak.types";
import { TransakWebViewProps } from "../TransakWebView/TransakWebView.types";

export type TransakOffRampWebViewProps = Omit<TransakWebViewProps, "queryParams"> & {
    queryParams: TransakOffRampQueryParams;
};
