import { Col, Form, useSetTab } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { WithdrawForm, WithdrawScreens, WithdrawSummary } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import { WithdrawSelectorCard } from "./SelectAccountAndDepositScreen.styles";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useWalletState from "module/wallet/hook/useWalletState";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import { Loader } from "module/transaction/component/feedback/Loader/Loader";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import useGetFee from "module/transaction/query/useGetFee";
import DepositsSelector from "module/dao/component/input/DepositsSelector/DepositsSelector";

interface WithdrawSelectAccountScreenProps {
    setWithdrawInfo: Dispatch<SetStateAction<WithdrawSummary>>;
}

const SelectAccountAndDepositScreen = ({ setWithdrawInfo }: WithdrawSelectAccountScreenProps) => {
    //Hooks
    const setTab = useSetTab();
    const { fee: selectedFee } = useRecoilValue(settingsState);
    const { data: fee, isLoading: feeIsLoading } = useGetFee(selectedFee);
    const {
        state: { selectedWallet: defaultSelectedWallet },
    } = useWalletState();
    const [selectedWallet, setSelectedWallet] = useState<number>(defaultSelectedWallet || 0);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const { data = [], isLoading: depositsIsLoading, refetch } = useGetDAOUnlockableAmounts(selectedWallet);

    //Functions
    const handleSubmit = (depositInfo: WithdrawForm) => {
        setWithdrawInfo({ ...depositInfo, feeRate: fee });
        setTab(WithdrawScreens.CONFIRMATION);
    };

    const onWalletChange = (index: number) => {
        refetch();
        setSelectedWallet(index);
    };

    useEffect(() => {
        if (isFirstTime && !depositsIsLoading) {
            setIsFirstTime(false);
        }
    }, [depositsIsLoading]);

    return (
        <ControlledSuspense isLoading={feeIsLoading || (isFirstTime && depositsIsLoading)} fallback={<Loader />}>
            <Form onSubmit={handleSubmit}>
                <Col>
                    <Col gap={20}>
                        <WithdrawSelectorCard style={{ marginTop: 5 }}>
                            <FormGroup label={translate("select_a_wallet") + ":"}>
                                <WalletSelector
                                    onChange={(index) => onWalletChange(index as number)}
                                    required
                                    name="receiver"
                                    value={selectedWallet}
                                />
                            </FormGroup>
                        </WithdrawSelectorCard>
                        <WithdrawSelectorCard>
                            <FormGroup label={`${translate("select_deposit")}:`} style={{ height: 80 }}>
                                <ControlledSuspense isLoading={depositsIsLoading} activityIndicatorSize={"large"}>
                                    <DepositsSelector name="deposit" deposits={data} required defaultValue={0} />
                                </ControlledSuspense>
                            </FormGroup>
                        </WithdrawSelectorCard>
                        <Button variant="outlined" fullWidth disabled={depositsIsLoading || data.length === 0}>
                            {translate("next")}
                        </Button>
                    </Col>
                </Col>
            </Form>
        </ControlledSuspense>
    );
};

export default SelectAccountAndDepositScreen;
