import { Col, Typography, useModal } from "@peersyst/react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import WithdrawModal, { WithdrawSummary as WithdrawSummaryType } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import WithdrawSummary from "./WithdrawSummary";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import useWithdrawOrUnlock from "module/dao/query/useWithdrawOrUnlock";
import { getAPC } from "module/dao/utils/getAPC";
import { useMemo, useState } from "react";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { useTranslate } from "module/common/hook/useTranslate";

interface WithdrawConfirmationScreenProps {
    withdrawInfo: WithdrawSummaryType;
}

const WithdrawConfirmationScreen = ({
    withdrawInfo: { receiverIndex, depositIndex, feeRate },
}: WithdrawConfirmationScreenProps): JSX.Element => {
    //Hooks
    const translate = useTranslate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const { hideModal } = useModal();
    const network = useSelectedNetwork();
    const {
        state: { wallets },
    } = useWalletState();
    const { data: unlockableDeposits = [] } = useGetDAOUnlockableAmounts();
    const { mutate: withdrawFromDAO, isLoading, isSuccess, isError } = useWithdrawOrUnlock(receiverIndex);

    //Variables
    const { name: receiverName } = wallets[receiverIndex]; //Receiver info
    const serviceInstance = useMemo(() => serviceInstancesMap.get(receiverIndex)?.[network], [receiverIndex]);
    const { compensation = BigInt(0), amount = BigInt(0) } = unlockableDeposits[depositIndex] || {}; //Deposit info

    //Functions
    const handleConfirmation = async () => {
        const mnemonic = await WalletStorage.getMnemonic(receiverIndex);
        if (unlockableDeposits.length > depositIndex) {
            withdrawFromDAO(
                { unlockableAmount: unlockableDeposits[depositIndex], mnemonic: mnemonic! },
                {
                    onSettled: () => setLoading(false),
                },
            );
        }
    };

    return (
        <>
            <Col gap={"7%"}>
                <WithdrawSummary
                    compensation={convertShannonsToCKB(compensation)}
                    receiverName={receiverName}
                    receiverAddress={serviceInstance?.getAddress() || ""}
                    depositAPC={getAPC({ daoCompensation: convertShannonsToCKB(compensation), daoDeposit: convertShannonsToCKB(amount) })}
                    amount={convertShannonsToCKB(amount)}
                    fee={convertShannonsToCKB(feeRate!).toString()}
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
                onExited={() => hideModal(WithdrawModal.id)}
                successMessage={translate("withdraw_completed")}
            />
        </>
    );
};

export default WithdrawConfirmationScreen;
