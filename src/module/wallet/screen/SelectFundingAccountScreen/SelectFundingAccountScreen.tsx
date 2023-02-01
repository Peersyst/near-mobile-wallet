import { config } from "config";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useEffect } from "react";
import SelectAccountScreen from "../SelectAccountScreen";

export interface SelectFundingAccountScreenForm {
    fundingAccount: number;
}

const SelectFundingAccountScreen = ({ onSubmit, submitText }: BaseAddWalletModalScreenProps) => {
    const translate = useTranslate();
    const {
        state: { fundingAccount },
        setFundAccount,
    } = useCreateWallet();

    const handleSubmit = ({ fundingAccount }: SelectFundingAccountScreenForm) => {
        setFundAccount(fundingAccount);
    };

    useEffect(() => {
        if (fundingAccount !== undefined) {
            onSubmit();
        }
    }, [fundingAccount]);

    return (
        <SelectAccountScreen
            name="fundingAccount"
            onSubmit={handleSubmit}
            submitText={submitText}
            minBalance={config.minBalanceToCreateAccount}
        >
            <Typography variant="body3Regular" light textAlign="center">
                {translate("select_funding_acc_explanation_1")}
                <Typography variant="body3Strong" light>
                    {config.minBalanceToCreateAccount} {config.tokenName}.
                </Typography>
                {translate("select_funding_acc_explanation_2")}
            </Typography>
        </SelectAccountScreen>
    );
};

export default SelectFundingAccountScreen;
