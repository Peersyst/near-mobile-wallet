import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import { translate } from "locale";
import { Typography } from "module/common/component/base/display/Typography";
import Button from "module/common/component/input/Button/Button";
import formatTimeDAORemainingCycle from "module/transaction/component/utils/formatTimeDAORemainingCycle";
import { Col } from "react-native-components";
import useUncommittedTransaction from "module/transaction/hook/useUncommittedTransaction";

export interface WithdrawButtonProps {
    unlockableDeposits: DAOUnlockableAmount[];
    buttonLoading: boolean;
    selectedDeposit: number;
    errMsg: string | undefined;
}

const WithdrawButton = ({ unlockableDeposits, buttonLoading, selectedDeposit, errMsg }: WithdrawButtonProps) => {
    const uncommittedTransaction = useUncommittedTransaction();
    const canContinue = unlockableDeposits[selectedDeposit]?.unlockable || unlockableDeposits[selectedDeposit]?.type === "deposit";
    return canContinue ? (
        <Col gap={8}>
            <Button
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
