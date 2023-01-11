import SelectAccountScreen from "module/wallet/screen/SelectAccountScreen";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import { BaseWalletWithFormScreenProps } from "module/wallet/wallet.types";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export interface WalletsBackupSelectAccountForm {
    selectedAccount: number;
}

const WalletsBackupSelectAccount = ({ submitText, onSubmit }: BaseWalletWithFormScreenProps) => {
    const [{ walletIndex }, setState] = useRecoilState(backupWalletState);
    const handleSubmit = ({ selectedAccount }: WalletsBackupSelectAccountForm) => {
        setState({ walletIndex: selectedAccount });
    };
    useEffect(() => {
        if (walletIndex !== undefined) {
            onSubmit();
        }
    }, [walletIndex]);
    return <SelectAccountScreen name="selectedAccount" onSubmit={handleSubmit} submitText={submitText} withBalanceError={false} />;
};

export default WalletsBackupSelectAccount;
