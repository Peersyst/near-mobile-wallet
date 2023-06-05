import { TransakOnRampQueryParams } from "../Transak.types";
import { TransakWebViewProps } from "../TransakWebView/TransakWebView.types";

export type TransakOnRampWebViewProps = Omit<TransakWebViewProps, "queryParams"> & {
    queryParams: TransakOnRampQueryParams;
};
