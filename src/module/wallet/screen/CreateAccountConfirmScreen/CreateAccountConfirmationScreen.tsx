import { Col } from "@peersyst/react-native-components";
import { config } from "config";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import SendSummary from "module/transaction/screen/SendConfirmationScreen/SendSummary";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import useWallet from "module/wallet/hook/useWallet";
import { useState } from "react";

export interface CreateAccountConfirmationScreenProps extends Pick<BaseAddWalletModalScreenProps, "submitText"> {
    onCancel: () => void;
    cancelText?: string;
    onSuccess: () => void;
    onSubmit: () => Promise<void>;
}

const CreateAccountConfirmationScreen = ({
    cancelText,
    onCancel,
    onSubmit,
    submitText,
    onSuccess,
}: CreateAccountConfirmationScreenProps) => {
    const {
        state: { name, fundingAccount },
    } = useCreateWallet();
    const { account } = useWallet(fundingAccount!);
    const translate = useTranslate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await onSubmit();
        setLoading(false);
        onSuccess();
    };

    return (
        <Col flex={1} alignItems="center" justifyContent="space-between">
            <SendSummary
                senderAccount={account!}
                receiverAccount={name!}
                amount={config.minBalanceToCreateAccount}
                fee={config.estimatedFee}
                showFiat
            />
            <Col style={{ width: "100%" }}>
                <Button variant="text" fullWidth onPress={onCancel} disabled={loading}>
                    {cancelText || translate("cancel")}
                </Button>
                <Button fullWidth onPress={handleSubmit} loading={loading}>
                    {submitText || translate("continue")}
                </Button>
            </Col>
        </Col>
    );
};

export default CreateAccountConfirmationScreen;
