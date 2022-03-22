import { Col, Paper, Row, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import SummaryField from "module/transaction/screen/SendConfirmationScreen/SummaryField";
import useWallet from "module/wallet/hook/useWallet";
import useSendTransaction from "../../query/useSendTransaction";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";

const SendConfirmationScreen = (): JSX.Element => {
    const { amount, fee, senderAddress, receiverAddress, message } = useRecoilValue(sendState);
    const {
        state: { cells },
    } = useWallet();
    const { name: senderName } = cells.find((cell) => cell.address === senderAddress)!;
    const { mutate: sendTransaction, isLoading, isSuccess, isError } = useSendTransaction();
    const { hideModal } = useModal();
    const refetch = useRefetchQuery();

    const handleConfirmation = () => {
        sendTransaction(
            { amount: amount!, message, receiverAddress: receiverAddress!, senderAddress: senderAddress! },
            { onSuccess: () => refetch(["balance", senderAddress]) },
        );
    };

    return (
        <>
            <Col gap={"10%"}>
                <Paper style={{ paddingTop: "10%", paddingHorizontal: "7%", paddingBottom: "7%" }}>
                    <Col gap={20} alignItems="center">
                        <Col gap={5} alignItems="center">
                            <Balance balance={amount!} units="CKB" variant="h1" boldUnits />
                            <Row>
                                <Typography variant="body1">{translate("transaction_fee_label")}: </Typography>
                                <Balance balance={fee!} units="CKB" variant="body1" fontWeight="bold" boldUnits />
                            </Row>
                        </Col>
                        <Row>
                            <Typography variant="h2">{translate("total")}: </Typography>
                            <Balance
                                balance={(Number(amount) + Number(fee)).toString()}
                                units="CKB"
                                variant="h2"
                                fontWeight="bold"
                                boldUnits
                            />
                        </Row>
                        <Col gap={20}>
                            <SummaryField label={translate("from")}>{senderName + " - " + senderAddress}</SummaryField>
                            <SummaryField label={translate("to")}>{receiverAddress!}</SummaryField>
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
                    seconds={10}
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
