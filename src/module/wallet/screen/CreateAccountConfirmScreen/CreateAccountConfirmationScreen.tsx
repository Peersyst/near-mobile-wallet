import { Col } from "@peersyst/react-native-components";
import { config } from "config";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import SendSummary from "module/transaction/screen/SendConfirmationScreen/SendSummary";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import useWallet from "module/wallet/hook/useWallet";

export interface CreateAccountConfirmationScreenProps extends BaseAddWalletModalScreenProps {
    onCancel: () => void;
    cancelText?: string;
}

const CreateAccountConfirmationScreen = ({ cancelText, onCancel, onSubmit, submitText }: CreateAccountConfirmationScreenProps) => {
    const {
        state: { name, fundingAccount },
    } = useCreateWallet();
    const { account } = useWallet(fundingAccount!);
    const translate = useTranslate();
    return (
        <Col flex={1} alignItems="center" justifyContent="space-between">
            <SendSummary
                senderAccount={account!}
                receiverAccount={name!}
                amount={config.minBalanceToCreateAccount}
                fee={config.estimatedFee}
                token="token"
            />
            <Col style={{ width: "100%" }}>
                <Button variant="text" fullWidth onPress={onCancel}>
                    {cancelText || translate("cancel")}
                </Button>
                <Button fullWidth onPress={onSubmit}>
                    {submitText || translate("continue")}
                </Button>
            </Col>
        </Col>
    );
};

export default CreateAccountConfirmationScreen;
