import { Col, Typography, useModal } from "@peersyst/react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import useWalletState from "module/wallet/hook/useWalletState";
import DepositModal from "module/dao/component/core/DepositModal/DepositModal";
import DepositSummary from "./DepositSummary";
import useDepositInDAO from "module/dao/query/useDepositInDAO";
import settingsState from "module/settings/state/SettingsState";
import { convertCKBToShannons } from "module/wallet/utils/convertCKBToShannons";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { useState } from "react";
import { useTranslate } from "module/common/hook/useTranslate";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

const DepositConfirmationScreen = (): JSX.Element => {
    const translate = useTranslate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const { amount, fee: feeInCKB, senderWalletIndex } = useRecoilValue(sendState);
    const {
        state: { wallets },
    } = useWalletState();
    const senderWallet = wallets[senderWalletIndex!];
    const { name: senderName } = senderWallet;
    const { serviceInstance } = useServiceInstance(senderWalletIndex);
    const { fee: feeInShannons } = useRecoilValue(settingsState);
    const { mutate: depositInDAO, isLoading, isSuccess, isError } = useDepositInDAO(senderWalletIndex!);
    const { hideModal } = useModal();
    const handleConfirmation = async () => {
        depositInDAO(
            { amount: convertCKBToShannons(amount!), feeRate: feeInShannons },
            {
                onSettled: () => setLoading(false),
            },
        );
        //The SendState is cleaned in the "onExited" method of DepositModal
    };

    return (
        <>
            <Col gap={"5%"}>
                <DepositSummary
                    amount={amount!}
                    fee={feeInCKB!}
                    senderName={senderName}
                    senderAddress={serviceInstance?.getAddress() || ""}
                />
                <Typography variant="caption" textAlign="center">
                    {translate("send_confirmation_text")}
                </Typography>
                <CountdownButton
                    loading={loading}
                    disabled={isSuccess}
                    variant="outlined"
                    seconds={5}
                    fullWidth
                    onPress={() => setShowConfirmation(true)}
                >
                    {translate("confirm")}
                </CountdownButton>
            </Col>
            <ConfirmPinModal
                open={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onPinConfirmed={() => setLoading(true)}
                onConfirmedExited={handleConfirmation}
            />
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
