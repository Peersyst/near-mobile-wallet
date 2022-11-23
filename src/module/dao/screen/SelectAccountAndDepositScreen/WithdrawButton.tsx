import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import Button from "module/common/component/input/Button/Button";

import { Col, Typography } from "@peersyst/react-native-components";
import useUncommittedTransaction from "module/transaction/hook/useUncommittedTransaction";
import { useTranslate } from "module/common/hook/useTranslate";
import useFormatTimeDAORemainingCycle from "module/transaction/component/hook/UseFormatTimeDAORemainingCycle/useFormatTimeDAORemaningCycle";

export interface WithdrawButtonProps {
    unlockableDeposits: DAOUnlockableAmount[];
    buttonLoading: boolean;
    selectedDeposit: number;
    errMsg: string | undefined;
}

const WithdrawButton = ({ unlockableDeposits, buttonLoading, selectedDeposit, errMsg }: WithdrawButtonProps) => {
    const translate = useTranslate();
    const uncommittedTransaction = useUncommittedTransaction();
    const formatTimeDAORemainingCycle = useFormatTimeDAORemainingCycle();
    const canContinue = unlockableDeposits[selectedDeposit]?.unlockable || unlockableDeposits[selectedDeposit]?.type === "deposit";
    return canContinue ? (
        <Col gap={8}>
            <Button
                type="submit"
                variant="outlined"
                fullWidth
                loading={buttonLoading || uncommittedTransaction}
                disabled={errMsg !== undefined || unlockableDeposits.length === 0 || uncommittedTransaction}
            >
                {unlockableDeposits[selectedDeposit].type === "deposit" ? translate("withdraw") : translate("unlock")}
            </Button>
            {uncommittedTransaction && (
                <Typography variant="body2" textAlign="center">
                    {translate("pending_transaction_text")}
                </Typography>
            )}
        </Col>
    ) : (
        <Typography variant="body1" textAlign="center">
            {translate("remaining_time") +
                ": " +
                formatTimeDAORemainingCycle(unlockableDeposits[selectedDeposit]?.remainingCycleMinutes || 0)}
        </Typography>
    );
};

export default WithdrawButton;
