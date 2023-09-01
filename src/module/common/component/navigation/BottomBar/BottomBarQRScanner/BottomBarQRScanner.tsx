import { useState } from "react";
import MainBottomBarItem from "../MainBottomBarItem/MainBottomBarItem";
import { QRCodeIcon } from "icons";
import { useTranslate } from "module/common/hook/useTranslate";
import QrScanner from "module/common/component/input/QrScanner/QrScanner";
import useSignerModal from "module/signer/hooks/useSignerModal";

const BottomBarQRScanner = (): JSX.Element => {
    const translate = useTranslate();
    const { showSignerModal } = useSignerModal();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleScan = (data: string) => {
        const { type, id } = JSON.parse(data);
        setOpen(false);
        showSignerModal(type, id);
    };

    return (
        <>
            <MainBottomBarItem Icon={QRCodeIcon} label={translate("scan")} style={{ marginTop: -10 }} onPress={handleOpen} />
            {open && <QrScanner open={open} onClose={() => setOpen(false)} onScan={({ data }) => handleScan(data)} />}
        </>
    );
};

export default BottomBarQRScanner;
