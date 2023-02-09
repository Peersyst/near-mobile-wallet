import { IconButton, PressableText, useTheme, useToast } from "@peersyst/react-native-components";
import { useState } from "react";
import { useTranslate } from "module/common/hook/useTranslate";
import { CameraIcon } from "icons";
import QrScanner from "module/common/component/input/QrScanner/QrScanner";
import AddressTextField, { AddressTextFieldProps } from "../AddressTextField/AddressTextField";
import { useModalState } from "module/common/hook/useModalState";

export type AddressTextFieldWithQRScanner = Omit<AddressTextFieldProps, "suffix">;

const AddressTextFieldWithQRScanner = ({ defaultValue = "", senderWalletIndex, ...rest }: AddressTextFieldWithQRScanner) => {
    const translate = useTranslate();
    const { showToast, hideToast } = useToast();
    const { palette } = useTheme();

    const [receiverAddress, setReceiverAddress] = useState(defaultValue);
    const { open, showModal, hideModal } = useModalState();

    const handleAddressScan = (data: string) => {
        setReceiverAddress(data);
        showToast(translate("scanned_address", { address: data }), {
            type: "success",
            duration: 10000,
            action: (
                <PressableText variant="body3Strong" onPress={hideToast}>
                    {translate("dismiss")}
                </PressableText>
            ),
        });
    };

    return (
        <>
            <AddressTextField
                /*
                 * Force re-render when the receiverAddress changes
                 * needed because of the debounce on the AddressTextField
                 */
                key={`address-${receiverAddress}-${senderWalletIndex}`}
                senderWalletIndex={senderWalletIndex}
                defaultValue={receiverAddress}
                suffix={
                    <IconButton onPress={showModal} style={{ fontSize: 24, color: palette.primary }}>
                        <CameraIcon />
                    </IconButton>
                }
                {...rest}
            />
            {open && <QrScanner open={open} onClose={hideModal} onScan={({ data }) => handleAddressScan(data)} />}
        </>
    );
};

export default AddressTextFieldWithQRScanner;
