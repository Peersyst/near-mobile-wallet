import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import DepositModal from "module/dao/component/core/DepositModal/DepositModal";
import useDepositInDAO from "module/dao/query/useDepositInDAO";
import { WithdrawSummary as WithdrawSummaryType } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import WithdrawSummary from "./WithdrawSummary";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";

interface WithdrawConfirmationScreenProps {
    withdrawInfo: WithdrawSummaryType;
}

const WithdrawConfirmationScreen = ({ withdrawInfo }: WithdrawConfirmationScreenProps): JSX.Element => {
    //Hooks
    const { hideModal } = useModal();
    const refetch = useRefetchQuery();
    const {
        state: { wallets },
    } = useWalletState();
    const { data: deposits = [] } = useGetDAOUnlockableAmounts();
    const { mutate: depositInDAO, isLoading, isSuccess, isError } = useDepositInDAO();

    //Variables
    const { receiver, deposit, feeRate } = withdrawInfo; //Data from the form
    const { name: receiverName, serviceInstance } = wallets[receiver]; //Receiver info
    const { compensation, amount } = deposits[deposit]; //Deposit info

    //Functions
    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(receiver);
        /*  depositInDAO(
            { amount: BigInt(amount!), mnemonic: mnemonic!, feeRate: fee! },
            { onSuccess: () => refetch(["balance", senderWalletIndex]) },
        ); */
        //The SendState is cleaned in the "onExited" method of WithdrawModal
    };

    return (
        <>
            <Col gap={"7%"}>
                <WithdrawSummary
                    receiverName={receiverName}
                    receiverAddress={serviceInstance?.getAddress() || ""}
                    depositAPC={compensation}
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
                onExited={() => hideModal(DepositModal.id)}
                successMessage={translate("withdraw_completed")}
            />
        </>
    );
};

export default WithdrawConfirmationScreen;
