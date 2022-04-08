import { Col, Form, useSetTab } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { WithdrawForm, WithdrawScreens, WithdrawSummary } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import SelectDeposit from "./SelectDeposit";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import { WithdrawSelectorCard } from "./SelectAccountAndDepositScreen.styles";
import { Dispatch, SetStateAction } from "react";
import useWalletState from "module/wallet/hook/useWalletState";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import { Loader } from "module/transaction/component/feedback/Loader/Loader";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import useGetFee from "module/transaction/query/useGetFee";

interface WithdrawSelectAccountScreenProps {
    setDepositInfo: Dispatch<SetStateAction<WithdrawSummary | undefined>>;
}

const SelectAccountAndDepositScreen = ({ setDepositInfo }: WithdrawSelectAccountScreenProps) => {
    const setTab = useSetTab();
    const { data = [], isLoading } = useGetDAOUnlockableAmounts();
    const { fee: selectedFee } = useRecoilValue(settingsState);
    const { data: fee, isLoading: feeIsLoading } = useGetFee(selectedFee);
    const {
        state: { selectedWallet },
        setSelectedWallet,
    } = useWalletState();
    const handleSubmit = (depositInfo: WithdrawForm) => {
        setDepositInfo({ ...depositInfo, feeRate: fee });
        setTab(WithdrawScreens.CONFIRMATION);
    };
    return (
        <ControlledSuspense isLoading={feeIsLoading} fallback={<Loader />}>
            <Form onSubmit={handleSubmit}>
                <Col>
                    <Col gap={20}>
                        <WithdrawSelectorCard style={{ marginTop: 5 }}>
                            <FormGroup label={translate("select_a_wallet") + ":"}>
                                <WalletSelector
                                    required
                                    name="receiver"
                                    value={selectedWallet}
                                    onChange={(index) => setSelectedWallet(index as number)}
                                />
                            </FormGroup>
                        </WithdrawSelectorCard>
                        <WithdrawSelectorCard>
                            <SelectDeposit />
                        </WithdrawSelectorCard>
                        <Button variant="outlined" fullWidth disabled={isLoading || data.length === 0}>
                            {translate("next")}
                        </Button>
                    </Col>
                </Col>
            </Form>
        </ControlledSuspense>
    );
};

export default SelectAccountAndDepositScreen;
