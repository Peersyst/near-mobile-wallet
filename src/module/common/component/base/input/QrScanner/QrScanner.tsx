import { QrScannerProps } from "module/common/component/base/input/QrScanner/QrScanner.types";
import { useEffect, useState } from "react";
import { BackButton, IdleQrScanner, QrScannerRoot } from "./QrScanner.styles";
import { Backdrop, createModal, StatusBar } from "module/common/component/base";
import { StyleSheet } from "react-native";
import { CrossIcon } from "../../assets/icons";
import { BarCodeScanner } from "expo-barcode-scanner";

const QrScanner = createModal(({ back, onScan, ...backdropProps }: QrScannerProps): JSX.Element => {
    const [hasPermission, setHasPermission] = useState<boolean>();

    useEffect(() => {
        BarCodeScanner.requestPermissionsAsync().then(({ status }) => setHasPermission(status === "granted"));
    }, []);

    return (
        <Backdrop transitionsDuration={0} {...backdropProps}>
            {([open, setOpen]) => {
                if (hasPermission === false) open && setOpen(false);
                return hasPermission ? (
                    <QrScannerRoot>
                        <StatusBar style={"light"} />
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
