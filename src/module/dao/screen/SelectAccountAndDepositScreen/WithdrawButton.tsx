import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import { translate } from "locale";
import { Typography } from "module/common/component/base/display/Typography";
import Button from "module/common/component/input/Button/Button";
import formatTimeDAORemainingCycle from "module/transaction/component/utils/formatTimeDAORemainingCycle";

export interface WithdrawButtonProps {
    unlockableDeposits: DAOUnlockableAmount[];
    buttonLoading: boolean;
    selectedDeposit: number;
    errMsg: string | undefined;
}

const WithdrawButton = ({ unlockableDeposits, buttonLoading, selectedDeposit, errMsg }: WithdrawButtonProps) => {
    const canContinue = unlockableDeposits[selectedDeposit]?.unlockable || unlockableDeposits[selectedDeposit]?.type === "deposit";
    return canContinue ? (
        <Button variant="outlined" fullWidth loading={buttonLoading} disabled={errMsg !== undefined || unlockableDeposits.length === 0}>
            {unlockableDeposits[selectedDeposit].type === "deposit" ? translate("withdraw") : translate("unlock")}
        </Button>
    ) : (
        <Typography variant="body1" textAlign="center">
            {translate("remaining_time") +
                ": " +
                formatTimeDAORemainingCycle(unlockableDeposits[selectedDeposit]?.remainingCycleMinutes || 0)}
        </Typography>
    );
};

export default WithdrawButton;
