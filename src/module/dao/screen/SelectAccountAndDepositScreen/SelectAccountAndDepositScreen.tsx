import { Col, Form, useSetTab, Suspense } from "@peersyst/react-native-components";
import { translate } from "locale";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { WithdrawForm, WithdrawScreens, WithdrawSummary } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import { ErrorMessageText, WithdrawSelectorCard } from "./SelectAccountAndDepositScreen.styles";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useWalletState from "module/wallet/hook/useWalletState";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import DepositsSelector from "module/dao/component/input/DepositsSelector/DepositsSelector";
import CenteredLoader from "module/common/component/feedback/CenteredLoader/CenteredLoader";
import useGetBalance from "module/wallet/query/useGetBalance";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";
import WithdrawButton from "./WithdrawButton";

interface WithdrawSelectAccountScreenProps {
    setWithdrawInfo: Dispatch<SetStateAction<WithdrawSummary>>;
}

const SelectAccountAndDepositScreen = ({ setWithdrawInfo }: WithdrawSelectAccountScreenProps) => {
    //Hooks
    const setTab = useSetTab();
    const { fee: feeInShannons } = useRecoilValue(settingsState);
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
    const [selectedDeposit, setSelectedDeposit] = useState<number>(0);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const { data: unlockableDeposits = [], isLoading: depositsIsLoading } = useGetDAOUnlockableAmounts(selectedWallet);
    const { data: { freeBalance } = {}, isLoading: balanceLoading } = useGetBalance(selectedWallet);
    const [errMsg, setErrMsg] = useState<string>();

    useEffect(() => {
        if (isFirstTime && !depositsIsLoading) {
            setIsFirstTime(false);
        }
    }, [depositsIsLoading]);

    useEffect(() => {
        if (freeBalance === undefined) return;
        if (freeBalance < convertShannonsToCKB(feeInShannons)) {
            setErrMsg(
                translate("not_enough_balance_for_fees") +
                    ".\n" +
                    translate("transaction_fee", { fee: convertShannonsToCKB(feeInShannons).toString() || "-" }),
            );
        } else setErrMsg(undefined);
    }, [selectedWallet]);

    //Functions
    const handleSubmit = (withdrawInfo: WithdrawForm) => {
        setWithdrawInfo({ ...withdrawInfo, feeRate: feeInShannons });
        setTab(WithdrawScreens.CONFIRMATION);
    };

    return (
        <Suspense isLoading={(isFirstTime && depositsIsLoading) || balanceLoading} fallback={<CenteredLoader color="black" />}>
            <Form onSubmit={handleSubmit}>
                <Col>
                    <Col gap={20}>
                        <WithdrawSelectorCard style={{ marginTop: 5 }}>
                            <WalletSelector
                                label={translate("select_a_wallet") + ":"}
                                onChange={(index) => setSelectedWallet(index as number)}
                                required
                                name="receiverIndex"
                                value={selectedWallet}
                            />
                        </WithdrawSelectorCard>
                        <WithdrawSelectorCard>
                            <Suspense isLoading={depositsIsLoading} activityIndicatorSize={"large"}>
                                <DepositsSelector
                                    label={`${translate("select_deposit")}:`}
                                    onChange={(deposit) => setSelectedDeposit(deposit)}
                                    value={selectedDeposit}
                                    name="depositIndex"
                                    deposits={unlockableDeposits}
                                    required
                                    defaultValue={0}
                                    style={{ height: 80 }}
                                />
                            </Suspense>
                        </WithdrawSelectorCard>
                        <WithdrawButton
                            unlockableDeposits={unlockableDeposits}
                            buttonLoading={balanceLoading || depositsIsLoading}
                            selectedDeposit={selectedDeposit}
                            errMsg={errMsg}
                        />
                        {errMsg && (
                            <ErrorMessageText variant="body2" fontWeight="bold" textAlign="center">
                                {errMsg}
                            </ErrorMessageText>
                        )}
                    </Col>
                </Col>
            </Form>
        </Suspense>
    );
};

export default SelectAccountAndDepositScreen;
