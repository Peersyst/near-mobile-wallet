import { BalanceProps } from "./Balance.types";
import Typography from "module/common/component/display/Typography/Typography";
import { getCurrencyUnit } from "./utils/getCurrencyUnit";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { getActionLabel } from "./utils/getActionLabel";
import { ActivityIndicator } from "react-native";
import Spinner from "module/common/component/feedback/Spinner/Spinner";
import { Suspense } from "@peersyst/react-native-components";

const Balance = ({
    balance,
    options,
    unit,
    unitPosition = "right",
    action = "display",
    isLoading = false,
    spinnerProps,
    ...typographyProps
}: BalanceProps): JSX.Element => {
    const formatedNum = useFormatNumber(balance.toString(), options);
    const actionLabel = getActionLabel[action];
    return (
        <Suspense isLoading={isLoading} fallback={<Spinner {...spinnerProps} />}>
            <Typography {...typographyProps}>
                {unit && unitPosition === "left" && getCurrencyUnit[unit] + " "}
                {actionLabel + formatedNum}
                {unit && unitPosition === "right" && " " + getCurrencyUnit[unit]}
            </Typography>
        </Suspense>
    );
};

export default Balance;
