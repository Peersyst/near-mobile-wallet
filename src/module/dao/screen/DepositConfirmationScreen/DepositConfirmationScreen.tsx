import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import DepositModal from "module/dao/component/core/DepositModal/DepositModal";
import DepositSummary from "./DepositSummary";
import useSendDepositToDao from "module/dao/query/useSendDepositToDao";

const DepositConfirmationScreen = (): JSX.Element => {
    const { amount, fee, senderWalletIndex } = useRecoilValue(sendState);
    const {
        state: { wallets },
    } = useWalletState();
    const senderWallet = wallets[senderWalletIndex!];
    const { name: senderName, serviceInstance } = senderWallet;
    const { mutate: sendDepositToDao, isLoading, isSuccess, isError } = useSendDepositToDao();
    const { hideModal } = useModal();
    const refetch = useRefetchQuery();

    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(senderWalletIndex!);
        sendDepositToDao({ amount: amount!, mnemonic: mnemonic! }, { onSuccess: () => refetch(["balance", senderWalletIndex]) });
        //The SendState is cleaned in the "onExited" method of SendModal || DepositModal
    };

    return (
        <>
            <Col gap={"5%"}>
                <DepositSummary balance={amount!} fee={fee!} senderName={senderName} serviceInstance={serviceInstance} />
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

export default DepositConfirmationScreen;
