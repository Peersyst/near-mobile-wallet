import useCreateWallet from "module/wallet/hook/useCreateWallet";
import MnemonicPicker from "module/wallet/component/input/MnemonicPicker/MnemonicPicker";
import Card from "module/common/component/surface/Card/Card";
import { Col, Typography, useTabs } from "react-native-components";
import { translate } from "locale";
import { CreateWalletScreens } from "module/wallet/CreateWalletNavigatorGroup";
import { useToast } from "module/common/component/base/feedback/ToastProvider";

const PickWalletMnemonicScreen = (): JSX.Element => {
    const setTab = useTabs()[1];
    const {
        state: { mnemonic },
    } = useCreateWallet();
    const { showToast } = useToast();

    const handleSuccess = () => {
        setTab(CreateWalletScreens.CREATE_WALLET_SUCCESS);
    };

    return (
        <Card style={{ flex: 1 }}>
            <Col gap={30}>
                <Typography variant="h3" fontWeight="bold" textTransform="uppercase" textAlign="center">
                    {translate("select_in_order")}
                </Typography>
                <MnemonicPicker
                    mnemonic={mnemonic!}
                    onSuccess={handleSuccess}
                    onError={() => showToast(translate("incorrect_mnemonic"), { type: "error" })}
                />
            </Col>
        </Card>
    );
};

export default PickWalletMnemonicScreen;
