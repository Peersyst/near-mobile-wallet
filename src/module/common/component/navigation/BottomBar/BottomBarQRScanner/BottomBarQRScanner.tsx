import { useState } from "react";
import MainBottomBarItem from "../MainBottomBarItem/MainBottomBarItem";
import { QRCodeIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import QrScanner from "module/common/component/input/QrScanner/QrScanner";
import useSignerModal from "module/signer/hooks/useSignerModal";
import { parseSignerDeepLinkData } from "module/signer/utils/parseSignerDeepLinkData";
import { useToast } from "@peersyst/react-native-components";

const BottomBarQRScanner = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { showSignerModal } = useSignerModal();
    const { showToast } = useToast();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleScan = (data: string) => {
        setOpen(false);
        const signerData = parseSignerDeepLinkData(data);
        if (!signerData) showToast(translateError("invalidSignerRequest"), { type: "error" });
        else showSignerModal(signerData!.type, signerData!.id);
    };

    return (
        <>
            <MainBottomBarItem Icon={QRCodeIcon} label={translate("scan")} style={{ marginTop: -10 }} onPress={handleOpen} />
            {open && <QrScanner open={open} onClose={() => setOpen(false)} onScan={({ data }) => handleScan(data)} />}
        </>
    );
};

export default BottomBarQRScanner;
