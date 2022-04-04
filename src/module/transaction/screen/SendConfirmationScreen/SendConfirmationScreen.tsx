import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import useSendTransaction from "../../query/useSendTransaction";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import SendSummary from "./SendSummary";

const SendConfirmationScreen = (): JSX.Element => {
    const { amount, fee, senderWalletIndex, receiverAddress, message } = useRecoilValue(sendState);
    const {
        state: { wallets },
    } = useWalletState();
    const senderWallet = wallets[senderWalletIndex!];
    const { name: senderName, serviceInstance } = senderWallet;
    const { mutate: sendTransaction, isLoading, isSuccess, isError } = useSendTransaction();
    const { hideModal } = useModal();
    const refetch = useRefetchQuery();

    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(senderWalletIndex!);
        sendTransaction(
            { amount: BigInt(amount!), message: message!, to: receiverAddress!, mnemonic: mnemonic!, feeRate: fee! },
            { onSuccess: () => refetch(["balance", senderWalletIndex]) },
        );
        //The SendState is cleaned in the "onExited" method of SendModal
    };

    return (
        <>
            <Col gap={"5%"}>
                <SendSummary
                    balance={amount!}
                    receiverAddress={receiverAddress!}
                    fee={fee!}
                    message={message!}
                    senderName={senderName}
                    serviceInstance={serviceInstance}
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
                onExited={() => hideModal(SendModal.id)}
                successMessage={translate("transaction_completed")}
            />
        </>
    );
};

export default SendConfirmationScreen;
