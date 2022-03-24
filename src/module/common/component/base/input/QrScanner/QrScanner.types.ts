import { CameraProps } from "expo-camera";
import { ReactElement } from "react";
import { ExposedBackdropProps } from "module/common/component/base";

export interface QrScannerProps
    extends Omit<
        ExposedBackdropProps,
        "animationIn" | "animationOut" | "animationInTiming" | "animationOutTiming" | "renderBackdrop" | "closable" | "defaultOpen"
    > {
    back?: ReactElement;
    onScan: NonNullable<CameraProps["onBarCodeScanned"]>;
}
