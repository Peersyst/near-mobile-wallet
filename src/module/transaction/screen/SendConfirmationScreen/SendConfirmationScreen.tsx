import { Col, Typography, useModal } from "@peersyst/react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import useWalletState from "module/wallet/hook/useWalletState";
import SendSummary from "./SendSummary";
import { useTranslate } from "module/common/hook/useTranslate";
import SendTransactionModal from "module/transaction/component/feedback/SendTransactionModal/SendTransactionModal";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { useSendTransaction } from "module/transaction/hook/useSendTransaction";

const SendConfirmationScreen = (): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();
    const sendStateValue = useRecoilValue(sendState);
    const { sendTransaction, ...rest } = useSendTransaction(sendStateValue);
    const {
        state: { wallets },
    } = useWalletState();

    const { asset, amount, receiverAddress, senderWalletIndex } = sendStateValue;
    const senderWallet = wallets[senderWalletIndex!];
    const { account: senderName } = senderWallet;

    async function handleSend() {
        await sendTransaction();
    }

    function closeModal() {
        hideModal(SendModal.id);
    }

    return (
        <SendTransactionModal onExited={closeModal} useMutationStatusResult={{ ...rest }} sendTransaction={handleSend}>
            {({ showModal, isSuccess, isLoading }) => (
                <Col gap={24} onStartShouldSetResponder={() => true}>
                    <SendSummary
                        nft={asset.nft}
                        token={asset.ft}
                        showFiat
                        showTotal
                        senderAccount={senderName!}
                        receiverAccount={receiverAddress!}
                        amount={amount!}
                    />
                    <Typography variant="body3Regular" textAlign="center" light>
                        {translate("send_confirmation_text")}
                    </Typography>
                    <CountdownButton loading={isLoading} disabled={isSuccess} seconds={5} fullWidth onPress={showModal}>
                        {translate("confirm")}
                    </CountdownButton>
                </Col>
            )}
        </SendTransactionModal>
    );
};

export default SendConfirmationScreen;
