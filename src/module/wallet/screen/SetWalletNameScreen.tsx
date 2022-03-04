import { Col, Form, Typography, useTabs } from "react-native-components";
import { translate } from "locale";
import Card from "module/common/component/surface/Card/Card";
import TextField from "module/common/component/input/TextField/TextField";
import Button from "module/common/component/input/Button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CreateWalletScreens } from "module/wallet/CreateWalletNavigatorGroup";
import useCreateWalletState from "module/wallet/hook/useCreateWalletState";

interface SetWalletNameForm {
    walletName: string;
}

const SetWalletNameScreen = (): JSX.Element => {
    const {
        setName,
        state: { name },
    } = useCreateWalletState();

    const setTab = useTabs()[1];

    const handleSubmit = ({ walletName }: SetWalletNameForm) => {
        setName(walletName);
        setTab(CreateWalletScreens.SET_WALLET_PIN);
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <Col flex={1} gap={30} justifyContent="flex-end">
                <Card>
                    <Typography variant="body1">{translate("set_wallet_name_text")}</Typography>
                </Card>
                <Form onSubmit={handleSubmit}>
                    <Col gap={60} style={{ paddingHorizontal: 20 }}>
                        <TextField name="walletName" defaultValue={name} placeholder={translate("wallet_name")} validators="not-null" />
                        <Button fullWidth variant="outlined">
                            {translate("set_pin")}
                        </Button>
                    </Col>
                </Form>
            </Col>
        </KeyboardAwareScrollView>
    );
};

export default SetWalletNameScreen;
