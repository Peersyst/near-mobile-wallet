import { Col, Form, useSetTab } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { WithdrawForm, WithdrawScreens, WithdrawSummary } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import { ErrorMessageText, WithdrawSelectorCard } from "./SelectAccountAndDepositScreen.styles";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import useWalletState from "module/wallet/hook/useWalletState";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import useGetFee from "module/transaction/query/useGetFee";
import DepositsSelector from "module/dao/component/input/DepositsSelector/DepositsSelector";
import CenteredLoader from "module/common/component/feedback/CenteredLoader/CenteredLoader";
import useGetBalance from "module/wallet/query/useGetBalance";

interface WithdrawSelectAccountScreenProps {
    setWithdrawInfo: Dispatch<SetStateAction<WithdrawSummary>>;
}

const SelectAccountAndDepositScreen = ({ setWithdrawInfo }: WithdrawSelectAccountScreenProps) => {
    //Hooks
    const setTab = useSetTab();
    const { fee: selectedFee } = useRecoilValue(settingsState);
    const { data: fee, isLoading: feeIsLoading } = useGetFee(selectedFee);
    const {
        state: { selectedWallet: defaultSelectedWallet, wallets },
    } = useWalletState();
    const finalSelectedWallet =
        //Check if the user has a previous selectedWallet
        defaultSelectedWallet !== undefined
            ? //Check that the selected wallet is not the CreateWallet
              defaultSelectedWallet === wallets.length
                ? defaultSelectedWallet - 1
                : defaultSelectedWallet
            : 0;
    const [selectedWallet, setSelectedWallet] = useState<number>(finalSelectedWallet);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const { data = [], isLoading: depositsIsLoading } = useGetDAOUnlockableAmounts(selectedWallet);
    const { data: { freeBalance = 0 } = {}, isLoading: balanceLoading } = useGetBalance(selectedWallet);
    const unlockableDeposits = useMemo(() => data.filter((deposit) => deposit.unlockable), [data]);
    const [errMsg, setErrMsg] = useState<string>();

    useEffect(() => {
        if (isFirstTime && !depositsIsLoading) {
            setIsFirstTime(false);
        }
    }, [depositsIsLoading]);

    useEffect(() => {
        if (freeBalance < Number(fee)) {
            setErrMsg(translate("not_enough_balance_for_fees") + ".\n" + translate("transaction_fee", { fee: fee || "-" }));
        } else setErrMsg(undefined);
    }, [selectedWallet, feeIsLoading]);

    //Functions
    const handleSubmit = (withdrawInfo: WithdrawForm) => {
        setWithdrawInfo({ ...withdrawInfo, feeRate: fee });
        setTab(WithdrawScreens.CONFIRMATION);
    };

    return (
        <ControlledSuspense
            isLoading={feeIsLoading || (isFirstTime && (depositsIsLoading || balanceLoading))}
            fallback={<CenteredLoader color="black" />}
        >
            <Form onSubmit={handleSubmit}>
                <Col>
                    <Col gap={20}>
                        <WithdrawSelectorCard style={{ marginTop: 5 }}>
                            <FormGroup label={translate("select_a_wallet") + ":"}>
                                <WalletSelector
                                    onChange={(index) => setSelectedWallet(index as number)}
                                    required
                                    name="receiverIndex"
                                    value={selectedWallet}
                                />
                            </FormGroup>
                        </WithdrawSelectorCard>
                        <WithdrawSelectorCard>
                            <FormGroup label={`${translate("select_deposit")}:`} style={{ height: 80 }}>
                                <ControlledSuspense isLoading={depositsIsLoading} activityIndicatorSize={"large"}>
                                    <DepositsSelector name="depositIndex" deposits={unlockableDeposits} required defaultValue={0} />
                                </ControlledSuspense>
                            </FormGroup>
                        </WithdrawSelectorCard>
                        <Button
                            variant="outlined"
                            fullWidth
                            loading={balanceLoading || depositsIsLoading}
                            disabled={errMsg !== undefined || unlockableDeposits.length === 0}
                        >
                            {translate("next")}
                        </Button>
                        {errMsg && (
                            <ErrorMessageText variant="body2" fontWeight="bold" textAlign="center">
                                {errMsg}
                            </ErrorMessageText>
                        )}
                    </Col>
                </Col>
            </Form>
        </ControlledSuspense>
    );
};

export default SelectAccountAndDepositScreen;
