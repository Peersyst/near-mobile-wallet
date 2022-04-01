import { Col, Form } from "react-native-components";
import MnemonicInput from "module/wallet/component/input/MnemonicInput/MnemonicInput";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        if (submitted) {
            setSubmitted(false);
            onSubmit();
        }
    }, [submitted]);

    const handleSubmit = ({ mnemonic }: MnemonicForm) => {
        if (!submitted) {
            setMnemonic(mnemonic);
            setSubmitted(true);
        }
    };

    return (
        <Col justifyContent="flex-end" flex={1}>
            <Form onSubmit={handleSubmit}>
                <Col gap={20}>
                    <MnemonicInput />
                    <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }}>
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default EnterWalletMnemonicScreen;
