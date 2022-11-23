import {
    Backdrop,
    Col,
    createModal,
    ExposedBackdropProps,
    PressableText,
    Row,
    Typography,
    useToast,
} from "@peersyst/react-native-components";
import useWallet from "module/wallet/hook/useWallet";
import useEditWallet from "module/wallet/hook/useEditWallet";
import { EditWalletModalRoot } from "module/wallet/component/core/EditWalletModal/EditWalletModal.styles";
import TextField from "module/common/component/input/TextField/TextField";
import ColorPicker from "module/wallet/component/input/ColorPicker/ColorPicker";
import { useTheme } from "@peersyst/react-native-styled";
import { useState } from "react";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useTranslate } from "module/common/hook/useTranslate";

export interface EditWalletModalProps extends ExposedBackdropProps {
    index: number;
}

const EditWalletModal = createModal(({ index, closable = true, onClose, ...backdropProps }: EditWalletModalProps): JSX.Element => {
    const [open, setOpen] = useState(true);
    const translate = useTranslate();
    const { name, colorIndex } = useWallet(index);
    const {
        setName,
        setColorIndex,
        reset,
        initialState: { name: initialName, colorIndex: initialColorIndex },
    } = useEditWallet(index);
    const { showToast } = useToast();
    const {
        palette: { wallet: walletColors },
    } = useTheme();

    const handleColorPicked = (color: string): void => {
        setColorIndex(walletColors.findIndex((c) => c === color));
    };

    const handleClose = async (saved: boolean) => {
        setOpen(false);

        if (saved) {
            if (name !== initialName || colorIndex !== initialColorIndex) {
                await WalletStorage.editWallet(index, { name, colorIndex });
                showToast(translate("wallet_edited"), { type: "success" });
            }
        } else reset();
        onClose?.();
    };

    return (
        <Backdrop
            backdropOpacity={0.2}
            closable={name !== "" && closable}
            open={open}
            closeOnBackdropTap={false}
            onClose={() => handleClose(false)}
            {...backdropProps}
        >
            <EditWalletModalRoot>
                <Col gap={40}>
                    <Row justifyContent="space-between" alignItems="center">
                        <PressableText variant="body4Regular" onPress={() => handleClose(false)}>
                            {translate("cancel")}
                        </PressableText>
                        <Typography variant="h4Strong">{translate("edit_wallet")}</Typography>
                        <PressableText variant="body4Regular" disabled={name === ""} onPress={() => handleClose(true)}>
                            {translate("save")}
                        </PressableText>
                    </Row>
                    <Col gap="25%">
                        <TextField
                            size="lg"
                            value={name}
                            onChange={setName}
                            style={{ component: { input: { textAlign: "center" } } }}
                            placeholder={translate("wallet_name")}
                        />
                        <ColorPicker value={walletColors[colorIndex]} onColorPicked={handleColorPicked} />
                    </Col>
                </Col>
            </EditWalletModalRoot>
        </Backdrop>
    );
});

export default EditWalletModal;
