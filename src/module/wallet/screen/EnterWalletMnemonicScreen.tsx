import { Col, Form, useToast } from "@peersyst/react-native-components";
import MnemonicInput from "module/wallet/component/input/MnemonicInput/MnemonicInput";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useEffect, useState } from "react";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useTranslate } from "module/common/hook/useTranslate";
import { NearSDKService } from "near-peersyst-sdk";
import { BaseAddWalletModalScreenProps } from "../component/core/AddWalletModal/AddWalletModal.types";

export interface MnemonicForm {
    mnemonic: string[];
}

const EnterWalletMnemonicScreen = ({ onSubmit, submitText }: BaseAddWalletModalScreenProps): JSX.Element => {
    const translate = useTranslate();
    const {
        setMnemonic,
        state: { mnemonic },
    } = useCreateWallet();
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
        if (mnemonic) {
            onSubmit?.();
            setLoading(true);
        }
    }, [mnemonic]);

    const handleSubmit = ({ mnemonic: mnemonicParam }: MnemonicForm) => {
        const valid = NearSDKService.validateMnemonic(mnemonicParam.join(" "));
        if (valid) {
            setMnemonic(mnemonicParam);
        } else {
            notificationAsync(NotificationFeedbackType.Error);
            showToast(translate("incorrect_mnemonic"), { type: "error" });
        }
    };

    return (
        <Col justifyContent="flex-end" flex={1}>
            <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <Col gap={24} flex={1} justifyContent="space-between">
                    <MnemonicInput />
                    <Button type="submit" fullWidth loading={loading}>
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default EnterWalletMnemonicScreen;
