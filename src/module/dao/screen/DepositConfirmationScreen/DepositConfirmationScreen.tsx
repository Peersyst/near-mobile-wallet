import { Col, Typography, useModal } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import { useRefetchQuery } from "../../../../query/useRefetchQuery";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import DepositModal from "module/dao/component/core/DepositModal/DepositModal";
import DepositSummary from "./DepositSummary";
import useDepositInDAO from "module/dao/query/useDepositInDAO";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import settingsState from "module/settings/state/SettingsState";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";

const DepositConfirmationScreen = (): JSX.Element => {
    const { amount, fee, senderWalletIndex } = useRecoilValue(sendState);
    const {
        state: { wallets },
    } = useWalletState();
    const senderWallet = wallets[senderWalletIndex!];
    const { name: senderName } = senderWallet;
    const serviceInstance = serviceInstancesMap.get(senderWalletIndex!);
    const { fee: feeRate } = useRecoilValue(settingsState);
    const { mutate: depositInDAO, isLoading, isSuccess, isError } = useDepositInDAO(senderWalletIndex!);
    const { hideModal } = useModal();
    const refetch = useRefetchQuery();
    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(senderWalletIndex!);
        console.log(convertShannonsToCKB(amount!));
        /*  depositInDAO(
            { amount: convertShannonsToCKB(amount!), mnemonic: mnemonic!, feeRate: feeRate },
            { onSuccess: () => refetch(["balance", senderWalletIndex]) },
        ); */
        //The SendState is cleaned in the "onExited" method of DepositModal
    };

    return (
        <>
            <Col gap={"5%"}>
                <DepositSummary amount={amount!} fee={fee!} senderName={senderName} senderAddress={serviceInstance?.getAddress() || ""} />
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
