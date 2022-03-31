import { Col, Paper, Row, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import SummaryField from "module/transaction/screen/SendConfirmationScreen/SummaryField";
import useSendTransaction from "../../query/useSendTransaction";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";
import { formatAddress } from "@peersyst/react-utils";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";

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
            { amount: amount!, message, receiverAddress: receiverAddress!, mnemonic: mnemonic! },
            { onSuccess: () => refetch(["balance", senderWalletIndex]) },
        );
    };

    return (
        <>
            <Col gap={"6%"}>
                <Paper style={{ padding: "7%" }}>
                    <Col gap="4%" alignItems="center">
                        <Col gap={5} alignItems="center">
                            <Balance balance={amount!} units="CKB" variant="h1" boldUnits />
                            <Row>
                                <Typography variant="body1">{translate("transaction_fee_label")}: </Typography>
                                <Balance balance={fee!} units="CKB" variant="body1" fontWeight="bold" boldUnits />
                            </Row>
                        </Col>
                        <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                            <SummaryField label={translate("from")}>
                                {senderName + " - " + formatAddress(serviceInstance?.getAddress() || "", "middle", 3)}
                            </SummaryField>
                            <SummaryField label={translate("to")}>{formatAddress(receiverAddress!, "middle", 3)}</SummaryField>
                            <SummaryField label={translate("message")}>{message || "-"}</SummaryField>
                        </Col>
                    </Col>
                </Paper>
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
