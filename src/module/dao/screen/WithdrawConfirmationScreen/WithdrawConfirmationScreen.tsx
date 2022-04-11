import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import WithdrawModal, { WithdrawSummary as WithdrawSummaryType } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import WithdrawSummary from "./WithdrawSummary";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import useWithdrawAndUnlock from "module/dao/query/useWithdrawAndUnlock";
import { getAPC } from "module/dao/component/utils/getAPC";

interface WithdrawConfirmationScreenProps {
    withdrawInfo: WithdrawSummaryType;
}

const WithdrawConfirmationScreen = ({
    withdrawInfo: { receiverIndex, depositIndex, feeRate },
}: WithdrawConfirmationScreenProps): JSX.Element => {
    //Hooks
    const { hideModal } = useModal();
    const refetch = useRefetchQuery();
    const {
        state: { wallets },
    } = useWalletState();
    const { data: deposits = [] } = useGetDAOUnlockableAmounts();
    const unlockableDeposits = deposits.filter((deposit) => deposit.unlockable);
    const { mutate: withdrawFromDAO, isLoading, isSuccess, isError } = useWithdrawAndUnlock(receiverIndex);

    //Variables
    const { name: receiverName, serviceInstance } = wallets[receiverIndex]; //Receiver info
    const { compensation = BigInt(0), amount = BigInt(0) } = unlockableDeposits[depositIndex] || {}; //Deposit info

    //Functions
    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(receiverIndex);
        if (unlockableDeposits.length > depositIndex) {
            withdrawFromDAO(
                { unlockableAmount: unlockableDeposits[depositIndex], mnemonic: mnemonic!, feeRate: feeRate! },
                { onSuccess: handleOnSuccess },
            );
        }
    };

    const handleOnSuccess = () => {
        refetch(["daoBalance", receiverIndex]);
        refetch(["balance", receiverIndex]);
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
