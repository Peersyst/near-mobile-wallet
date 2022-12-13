import { Col, Form } from "@peersyst/react-native-components";
import { config } from "config";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";
import WalletSelectorGroup from "module/wallet/component/input/WalletSelectorGroup/WalletSelectorGroup";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useEffect } from "react";

export interface SelectFundingAccountForm {
    fundingAccount: number;
}

const SelectFundingAccount = ({ onSubmit, submitText }: BaseAddWalletModalScreenProps) => {
    const translate = useTranslate();
    const {
        state: { fundingAccount },
        setFundAccount,
    } = useCreateWallet();

    const handleSubmit = ({ fundingAccount }: SelectFundingAccountForm) => {
        setFundAccount(fundingAccount);
    };

    useEffect(() => {
        if (fundingAccount !== undefined) {
            onSubmit();
        }
    }, [fundingAccount]);

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col gap="10%" flex={1} justifyContent="space-between">
                <Col flex={1} gap="6%">
                    <Typography variant="body3Regular" light textAlign="center">
                        {translate("select_funding_acc_explanation_1")}
                        <Typography variant="body3Strong" light>
                            {config.minBalanceToCreateAccount} {config.tokenName}.
                        </Typography>
                        {translate("select_funding_acc_explanation_2")}
                    </Typography>
                    <WalletSelectorGroup name="fundingAccount" />
                </Col>
                <Button fullWidth type="submit">
                    {submitText}
                </Button>
            </Col>
        </Form>
    );
};

export default SelectFundingAccount;
