import { BalanceProps } from "./Balance.types";
import Typography from "module/common/component/display/Typography/Typography";
import { getCurrencyUnit } from "./utils/getCurrencyUnit";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { getActionLabel } from "./utils/getActionLabel";

const Balance = ({ balance, options, unit, unitPosition = "right", action = "display", ...typographyProps }: BalanceProps): JSX.Element => {
    const formatedNum = useFormatNumber(balance.toString(), options);
    const actionLabel = getActionLabel[action];
    return (
        <Typography {...typographyProps}>
            {unit && unitPosition === "left" && getCurrencyUnit[unit] + " "}
            {actionLabel + formatedNum}
            {unit && unitPosition === "right" && " " + getCurrencyUnit[unit]}
        </Typography>
    );
};

export default Balance;
