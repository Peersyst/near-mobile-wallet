import useCreateWallet from "module/wallet/hook/useCreateWallet";
import MnemonicPicker from "module/wallet/component/input/MnemonicPicker/MnemonicPicker";
import Card from "module/common/component/surface/Card/Card";
import { Col, Typography, useToast } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";

export interface PickWalletMnemonicScreenProps {
    onSubmit: () => void;
}

const PickWalletMnemonicScreen = ({ onSubmit }: PickWalletMnemonicScreenProps): JSX.Element => {
    const {
        state: { mnemonic },
    } = useCreateWallet();
    const { showToast } = useToast();
    const translate = useTranslate();
    return (
        <Card style={{ flex: 1 }}>
            <Col gap={30}>
                <Typography variant="h3" fontWeight="bold" textTransform="uppercase" textAlign="center">
                    {translate("select_in_order")}
                </Typography>
                <MnemonicPicker
                    mnemonic={mnemonic!}
                    onSuccess={onSubmit}
                    onError={() => showToast(translate("incorrect_mnemonic"), { type: "error" })}
                />
            </Col>
        </Card>
    );
};

export default PickWalletMnemonicScreen;
