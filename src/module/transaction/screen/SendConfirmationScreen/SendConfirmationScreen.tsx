import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import useSendTransaction from "../../query/useSendTransaction";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import SendSummary from "./SendSummary";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { useRefetchQueries } from "../../../../query/useRefetchQueries";
import settingsState from "module/settings/state/SettingsState";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";
import { convertCKBToShannons } from "module/wallet/utils/convertCKBToShannons";

const SendConfirmationScreen = (): JSX.Element => {
    const { amount, fee: feeInCKB, senderWalletIndex, receiverAddress, message } = useRecoilValue(sendState);
    const { fee: feeRate } = useRecoilValue(settingsState);
    const {
        state: { wallets },
    } = useWalletState();
    const senderWallet = wallets[senderWalletIndex!];
    const { name: senderName, index } = senderWallet;
    const serviceInstance = serviceInstancesMap.get(index);
    const { mutate: sendTransaction, isLoading, isSuccess, isError } = useSendTransaction();
    const { hideModal } = useModal();
    const refetch = useRefetchQueries();

    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(senderWalletIndex!);
        console.log(convertCKBToShannons(amount!));
        sendTransaction(
            { amount: convertCKBToShannons(amount!), message: message!, to: receiverAddress!, mnemonic: mnemonic!, feeRate },
            {
                onSuccess: () =>
                    refetch([
                        ["balance", senderWalletIndex],
                        ["transactions", senderWalletIndex],
                    ]),
            },
        );
        //The SendState is cleaned in the "onExited" method of SendModal
    };

    return (
        <>
            <Col gap={"5%"}>
                <SendSummary
                    amount={amount!}
                    receiverAddress={receiverAddress!}
                    fee={feeInCKB!}
                    message={message!}
                    senderName={senderName}
                    senderAddress={serviceInstance?.getAddress() || ""}
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
