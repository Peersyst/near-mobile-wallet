import { Col, Form } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import TextField from "module/common/component/input/TextField/TextField";
import { useEffect, useState } from "react";

export interface EnterPrivateKeyScreenProps {
    onSubmit: () => void;
    submitText: string;
}

interface PrivateKeyForm {
    privateKey: string;
}

const EnterPrivateKeyScreen = ({ onSubmit, submitText }: EnterPrivateKeyScreenProps) => {
    const {
        setPrivateKey,
        state: { privateKey },
    } = useCreateWallet();
    const translate = useTranslate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (privateKey) {
            setLoading(true);
            onSubmit?.();
        }
    }, [privateKey]);

    const handleSubmit = async ({ privateKey }: PrivateKeyForm) => {
        setPrivateKey(privateKey);
    };

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col gap="10%" flex={1} justifyContent="space-between">
                <TextField
                    name="privateKey"
                    validators={{ privateKey: true }}
                    label={translate("private_key")}
                    placeholder={translate("enter_private_key")}
                    required
                />
                <Button fullWidth type="submit" loading={loading}>
                    {submitText}
                </Button>
            </Col>
        </Form>
    );
};

export default EnterPrivateKeyScreen;
