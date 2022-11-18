import { Col, Form, useToast } from "@peersyst/react-native-components";
import MnemonicInput from "module/wallet/component/input/MnemonicInput/MnemonicInput";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useEffect, useState } from "react";
import { WalletService } from "near-peersyst-sdk";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useTranslate } from "module/common/hook/useTranslate";

export interface MnemonicForm {
    mnemonic: string[];
}

export interface EnterWalletMnemonicScreenProps {
    onSubmit: () => void;
    submitText: string;
}

const EnterWalletMnemonicScreen = ({ onSubmit, submitText }: EnterWalletMnemonicScreenProps): JSX.Element => {
    const translate = useTranslate();
    const { setMnemonic } = useCreateWallet();
    const [submitted, setSubmitted] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if (submitted) {
            setSubmitted(false);
            onSubmit();
        }
    }, [submitted]);

    const handleSubmit = ({ mnemonic }: MnemonicForm) => {
        if (!submitted) {
            const valid = WalletService.validateMnemonic(mnemonic.join(" "));
            if (valid) {
                setMnemonic(mnemonic);
                setSubmitted(true);
            } else {
                notificationAsync(NotificationFeedbackType.Error);
                showToast(translate("incorrect_mnemonic"), { type: "error" });
            }
        }
    };

    return (
        <Col justifyContent="flex-end" flex={1}>
            <Form onSubmit={handleSubmit}>
                <Col gap={24} style={{ marginTop: 5 }}>
                    <MnemonicInput />
                    <Button type="submit" fullWidth>
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default EnterWalletMnemonicScreen;
