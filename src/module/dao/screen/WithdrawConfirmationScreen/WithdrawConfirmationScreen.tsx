import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import DepositModal from "module/dao/component/core/DepositModal/DepositModal";
import useDepositInDAO from "module/dao/query/useDepositInDAO";
import { WithdrawForm } from "module/dao/component/core/WithdrawModal/WithdrawModal";

interface WithdrawConfirmationScreenProps {
    depositInfo?: WithdrawForm;
}

const WithdrawConfirmationScreen = ({ depositInfo }: WithdrawConfirmationScreenProps): JSX.Element => {
    const {
        state: { wallets },
    } = useWalletState();
    const senderWallet = wallets[depositInfo?.receiver!];
    const { name: senderName, serviceInstance } = senderWallet;
    const { mutate: depositInDAO, isLoading, isSuccess, isError } = useDepositInDAO();
    const { hideModal } = useModal();
    const refetch = useRefetchQuery();

    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(depositInfo?.receiver!);
        /*  depositInDAO(
            { amount: BigInt(amount!), mnemonic: mnemonic!, feeRate: fee! },
            { onSuccess: () => refetch(["balance", senderWalletIndex]) },
        ); */
        //The SendState is cleaned in the "onExited" method of WithdrawModal
    };

    console.log(depositInfo);

    return (
        <>
            <Col gap={"5%"}>
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
                successMessage={translate("deposit_completed")}
            />
        </>
    );
};

export default WithdrawConfirmationScreen;
