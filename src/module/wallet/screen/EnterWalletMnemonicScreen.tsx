import { Col, Form, useToast } from "@peersyst/react-native-components";
import MnemonicInput from "module/wallet/component/input/MnemonicInput/MnemonicInput";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useEffect, useState } from "react";
import { WalletService } from "ckb-peersyst-sdk";
import { translate } from "locale";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

export interface MnemonicForm {
    mnemonic: string[];
}

export interface EnterWalletMnemonicScreenProps {
    onSubmit: () => void;
    submitText: string;
}

const EnterWalletMnemonicScreen = ({ onSubmit, submitText }: EnterWalletMnemonicScreenProps): JSX.Element => {
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
        console.log(mnemonic, mnemonic.join(" "));
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
                <Col gap={20}>
                    <MnemonicInput />
                    <Button type="submit" fullWidth variant="outlined" style={{ marginHorizontal: 20 }}>
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default EnterWalletMnemonicScreen;
