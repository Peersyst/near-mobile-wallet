import { BarCodeScannerProps } from "expo-barcode-scanner";
import { ReactElement } from "react";
import { BackdropProps } from "module/common/component/base";

export interface QrScannerProps
    extends Omit<BackdropProps, "children" | "transitionsDuration" | "transparent" | "closable" | "defaultOpen"> {
    back?: ReactElement;
    onScan: NonNullable<BarCodeScannerProps["onBarCodeScanned"]>;
}
