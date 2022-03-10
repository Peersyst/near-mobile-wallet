import { Col, Form, useSetTab } from "react-native-components";
import MnemonicInput from "module/wallet/component/input/MnemonicInput/MnemonicInput";
import Button from "module/common/component/input/Button/Button";
import { translate } from "locale";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { ImportWalletScreens } from "module/wallet/navigator/ImportWalletNavigatorGroup";

export interface MnemonicForm {
    mnemonic: string[];
}

const EnterWalletMnemonicScreen = (): JSX.Element => {
    const setTab = useSetTab();
    const { setMnemonic } = useCreateWallet();

    const handleSubmit = ({ mnemonic }: MnemonicForm) => {
        setMnemonic(mnemonic);
        setTab(ImportWalletScreens.SET_WALLET_PIN);
    };

    return (
        <Col justifyContent="flex-end" flex={1}>
            <Form onSubmit={handleSubmit}>
                <Col gap={20}>
                    <MnemonicInput />
                    <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }}>
                        {translate("set_pin")}
                    </Button>
                </Col>
            </Form>
        </Col>
    );
};

export default EnterWalletMnemonicScreen;
