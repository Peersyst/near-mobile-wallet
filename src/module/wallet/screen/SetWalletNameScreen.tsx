import { Col, Form, Row, Typography } from "react-native-components";
import { translate } from "locale";
import Card from "module/common/component/surface/Card/Card";
import TextField from "module/common/component/input/TextField/TextField";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { image } from "asset/image";
import { WalletImage } from "../component/display/WalletImage/WalletImage.styles";

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

    const handleSubmit = ({ walletName }: SetWalletNameForm) => {
        setName(walletName);
        onSubmit();
    };
    return (
        <Col flex={1} gap={20} justifyContent="flex-end">
            <Col alignItems="center" justifyContent="center" flex={1}>
                <WalletImage source={image.wallet} />
            </Col>
            <Card>
                <Typography variant="body1">{translate("set_wallet_name_text")}</Typography>
            </Card>
            <Form onSubmit={handleSubmit}>
                <Col gap={30} style={{ paddingHorizontal: 20 }}>
                    <TextField name="walletName" defaultValue={name} placeholder={translate("wallet_name")} validators="not-null" />
                    <Button fullWidth variant="outlined">
                        {submitText}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default SetWalletNameScreen;
