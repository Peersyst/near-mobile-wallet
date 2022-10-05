import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useMergeDefaultProps } from "@peersyst/react-components-core";
import { Backdrop, createModal, CrossIcon, ExposedBackdropProps, IconButton } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import Constants from "expo-constants";
import { CameraProps } from "expo-camera";
import { ReactElement } from "react";

//Types
export interface QrScannerProps
    extends Omit<
        ExposedBackdropProps,
        "animationIn" | "animationOut" | "animationInTiming" | "animationOutTiming" | "renderBackdrop" | "closable" | "defaultOpen"
    > {
    back?: ReactElement;
    onScan: NonNullable<CameraProps["onBarCodeScanned"]>;
}

//Styles
export const IdleQrScanner = styled(View)(() => ({
    width: "100%",
    height: "100%",
}));

export const QrScannerRoot = styled(View)(() => ({
    width: "100%",
    height: "100%",
    margin: "-5%",
}));

export const BackButton = styled(IconButton)(() => ({
    position: "absolute",
    left: "10%",
    top: 30 + Constants.statusBarHeight,
    zIndex: 1,
}));

const QrScanner = createModal((props: QrScannerProps): JSX.Element => {
    const { back, onScan, ...backdropProps } = useMergeDefaultProps("QrScanner", props);

    const [hasPermission, setHasPermission] = useState<boolean>();

    useEffect(() => {
        BarCodeScanner.requestPermissionsAsync().then(({ status }) => setHasPermission(status === "granted"));
    }, []);

    return (
        <Backdrop
            style={{ margin: "-5%" }}
            animationInTiming={1}
            animationOutTiming={1}
            animationIn="fadeIn"
            animationOut="fadeOut"
            {...backdropProps}
        >
            {(open, setOpen) => {
                if (hasPermission === false) open && setOpen(false);
                return hasPermission ? (
                    <QrScannerRoot>
                        <BackButton style={{ color: "white", fontSize: 30 }} onPress={() => setOpen(false)}>
                            {back || <CrossIcon />}
                        </BackButton>
                        <BarCodeScanner
                            onBarCodeScanned={(data) => {
                                onScan(data);
                                setOpen(false);
                            }}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </QrScannerRoot>
                ) : (
                    <IdleQrScanner />
                );
            }}
        </Backdrop>
    );
});

export default QrScanner;
