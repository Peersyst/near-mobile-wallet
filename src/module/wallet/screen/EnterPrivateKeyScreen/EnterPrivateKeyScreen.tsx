import { Col, Form } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import TextField from "module/common/component/input/TextField/TextField";

export interface EnterPrivateKeyScreenProps {
    onSubmit: () => void;
    submitText: string;
}

interface PrivateKeyForm {
    privateKey: string;
}

const EnterPrivateKeyScreen = ({ onSubmit, submitText }: EnterPrivateKeyScreenProps) => {
    const { setPrivateKey } = useCreateWallet();
    const translate = useTranslate();

    const handleSubmit = ({ privateKey }: PrivateKeyForm) => {
        setPrivateKey(privateKey);
        onSubmit();
    };
    return (
        <Col gap="10%">
            <Form onSubmit={handleSubmit}>
                <Col gap={30}>
                    <TextField
                        name="privateKey"
                        validators={{ privateKey: true }}
                        label={translate("private_key")}
                        placeholder={translate("enter_private_key")}
                        required
                    />
                    <Button fullWidth type="submit">
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default EnterPrivateKeyScreen;
