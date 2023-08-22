import { useState } from "react";
import MainBottomBarItem from "../MainBottomBarItem/MainBottomBarItem";
import { QRCodeIcon } from "icons";
import { useTranslate } from "module/common/hook/useTranslate";
import QrScanner from "module/common/component/input/QrScanner/QrScanner";

const BottomBarQRScanner = (): JSX.Element => {
    const translate = useTranslate();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleScan = () => {
        // TODO: handle scan and trigger modal/screen when designs are done
        setOpen(false);
    };

    return (
        <>
            <MainBottomBarItem Icon={QRCodeIcon} label={translate("scan")} style={{ marginTop: -10 }} onPress={handleOpen} />
            {open && <QrScanner onClose={() => setOpen(false)} onScan={handleScan} />}
        </>
    );
};

export default BottomBarQRScanner;
