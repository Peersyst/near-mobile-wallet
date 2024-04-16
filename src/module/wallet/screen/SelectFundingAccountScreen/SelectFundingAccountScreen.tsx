import { config } from "config";
import Typography from "module/common/component/display/Typography/Typography";
import useTranslate from "module/common/hook/useTranslate";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import SelectAccountScreen from "../SelectAccountScreen";

export interface SelectFundingAccountScreenForm {
    fundingAccount: number;
}

const SelectFundingAccountScreen = ({ onSubmit, submitText }: BaseAddWalletModalScreenProps) => {
    const translate = useTranslate();
    const {
        setFundAccount,
        state: { fundingAccount },
    } = useCreateWallet();

    const handleSubmit = ({ fundingAccount }: SelectFundingAccountScreenForm) => {
        setFundAccount(fundingAccount);
        onSubmit?.();
    };

    return (
        <SelectAccountScreen
            minBalance={config.minBalanceToCreateAccount}
            defaultWalletIndex={fundingAccount}
            name="fundingAccount"
            onSubmit={handleSubmit}
            submitText={submitText}
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
