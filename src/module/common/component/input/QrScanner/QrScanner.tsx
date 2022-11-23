import { QrScannerProps as BaseQrScannerProps, QrScanner as BaseQrScanner } from "@peersyst/react-native-components";
import { QrScannerMark, QrScannerMarksWrapper } from "module/common/component/input/QrScanner/QrScanner.styles";

export type QrScannerProps = Omit<BaseQrScannerProps, "children">;

const QrScanner = (props: QrScannerProps): JSX.Element => (
    <BaseQrScanner {...props}>
        <QrScannerMarksWrapper>
            <QrScannerMark position="tl" />
            <QrScannerMark position="tr" />
            <QrScannerMark position="br" />
            <QrScannerMark position="bl" />
        </QrScannerMarksWrapper>
    </BaseQrScanner>
);

export default QrScanner;
