import { Col, Form, Typography } from "@peersyst/react-native-components";
import Card from "module/common/component/surface/Card/Card";
import TextField from "module/common/component/input/TextField/TextField";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { wallet } from "asset/image";
import WalletImage from "../component/display/WalletImage/WalletImage";
import { useTranslate } from "module/common/hook/useTranslate";

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
        <Col flex={1} gap={30} justifyContent="flex-end">
            <Col alignItems="center" justifyContent="center" flex={1}>
                <WalletImage source={wallet} />
            </Col>
            <Card>
                <Typography variant="body1">
                    <Typography fontWeight="bold" variant="body1">
                        {translate("security_first")}
                    </Typography>
                    {translate("set_wallet_name_text")}
                </Typography>
            </Card>
            <Form onSubmit={handleSubmit}>
                <Col gap={30} style={{ paddingHorizontal: 20 }}>
                    <TextField name="walletName" defaultValue={name} placeholder={translate("wallet_name")} required />
                    <Button fullWidth variant="outlined" type="submit">
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default SetWalletNameScreen;
