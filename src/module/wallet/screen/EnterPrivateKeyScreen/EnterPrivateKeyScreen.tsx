import { Col, Form, TextField } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import useCreateWallet from "module/wallet/hook/useCreateWallet";

export interface EnterPrivateKeyScreenProps {
    onSubmit: () => void;
    submitText: string;
}

const EnterPrivateKeyScreen = ({ onSubmit, submitText }: EnterPrivateKeyScreenProps) => {
    const { setImportWithPrivateKey } = useCreateWallet();
    const translate = useTranslate();
    //TODO: implement this component
    const handleSubmit = () => {
        onSubmit();
    };
    return (
        <Col gap="10%">
            <Form onSubmit={handleSubmit}>
                <Col gap={30}>
                    <TextField name="privateKey" placeholder={translate("wallet_name")} required />
                    <Button fullWidth type="submit">
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default EnterPrivateKeyScreen;
