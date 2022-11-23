import { Col, Form } from "@peersyst/react-native-components";
import TextField from "module/common/component/input/TextField/TextField";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useTranslate } from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";

interface SetWalletNameForm {
    walletName: string;
}

export interface SetWalletNameScreenProps {
    onSubmit: () => void;
    submitText: string;
}

const SetWalletNameScreen = ({ onSubmit, submitText }: SetWalletNameScreenProps): JSX.Element => {
    const {
        setName,
        state: { name },
    } = useCreateWallet();
    const translate = useTranslate();
    const handleSubmit = ({ walletName }: SetWalletNameForm) => {
        setName(walletName);
        onSubmit();
    };
    return (
        <Col flex={1} gap={24} justifyContent="flex-end">
            <Advise title={translate("security_first")} text={translate("set_wallet_name_text")} />
            <Form onSubmit={handleSubmit}>
                <Col gap={30}>
                    <TextField name="walletName" defaultValue={name} placeholder={translate("wallet_name")} required />
                    <Button fullWidth type="submit">
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default SetWalletNameScreen;
