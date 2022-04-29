import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import WithdrawModal, { WithdrawSummary as WithdrawSummaryType } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import WithdrawSummary from "./WithdrawSummary";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import useWithdrawOrUnlock from "module/dao/query/useWithdrawOrUnlock";
import { getAPC } from "module/dao/utils/getAPC";
import { useRefetchQueries } from "../../../../query/useRefetchQueries";
import { useMemo } from "react";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

interface WithdrawConfirmationScreenProps {
    withdrawInfo: WithdrawSummaryType;
}

const WithdrawConfirmationScreen = ({
    withdrawInfo: { receiverIndex, depositIndex, feeRate },
}: WithdrawConfirmationScreenProps): JSX.Element => {
    //Hooks
    const { hideModal } = useModal();
    const refetch = useRefetchQueries();
    const {
        state: { wallets },
    } = useWalletState();
    const { data: deposits = [] } = useGetDAOUnlockableAmounts();
    const unlockableDeposits = useMemo(() => deposits.filter((deposit) => deposit.unlockable), [deposits]);
    const { mutate: withdrawFromDAO, isLoading, isSuccess, isError } = useWithdrawOrUnlock(receiverIndex);

    //Variables
    const { name: receiverName } = wallets[receiverIndex]; //Receiver info
    const serviceInstance = useMemo(() => serviceInstancesMap.get(receiverIndex), [receiverIndex]);
    const { compensation = BigInt(0), amount = BigInt(0) } = unlockableDeposits[depositIndex] || {}; //Deposit info

    //Functions
    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(receiverIndex);
        if (unlockableDeposits.length > depositIndex) {
            withdrawFromDAO({ unlockableAmount: unlockableDeposits[depositIndex], mnemonic: mnemonic! }, { onSuccess: handleOnSuccess });
        }
    };

    const handleOnSuccess = () => {
        refetch([
            ["daoBalance", receiverIndex],
            ["balance", receiverIndex],
        ]);
    };

    return (
        <>
            <Col gap={"7%"}>
                <WithdrawSummary
                    receiverName={receiverName}
                    receiverAddress={serviceInstance?.getAddress() || ""}
                    depositAPC={getAPC({ daoCompensation: compensation, daoDeposit: amount })}
                    amount={amount}
                    fee={feeRate!}
                />
                <Typography variant="caption" textAlign="center">
                    {translate("send_confirmation_text")}
                </Typography>
                <CountdownButton
                    loading={isLoading}
                    disabled={isSuccess}
                    variant="outlined"
                    seconds={5}
                    fullWidth
                    onPress={handleConfirmation}
                >
                    {translate("confirm")}
                </CountdownButton>
            </Col>
            <LoadingModal
                loading={isLoading}
                success={isSuccess}
                error={isError}
                onExited={() => hideModal(WithdrawModal.id)}
                successMessage={translate("withdraw_completed")}
            />
        </>
    );
};

export default WithdrawConfirmationScreen;
