import { BalanceProps } from "./Balance.types";
import Typography from "module/common/component/display/Typography/Typography";
import { Spinner, Suspense } from "@peersyst/react-native-components";
import { useFormatBalance } from "./hook/useFormatBalance";
import { BALANCE_THRESHOLDS } from "module/wallet/component/display/Balance/constants/balanceThresholds";

const Balance = ({
    balance,
    options,
    units,
    unitsPosition = "right",
    action,
    isLoading = false,
    minimumFallbackDisplay,
    spinnerProps,
    thresholds = BALANCE_THRESHOLDS,
    ...typographyProps
}: BalanceProps): JSX.Element => {
    const formattedBalance = useFormatBalance(balance, {
        numberFormatOptions: options,
        units,
        unitsPosition,
        action,
        thresholds,
        minimumFallbackDisplay,
    });

    return (
        <Suspense isLoading={isLoading} fallback={<Spinner {...spinnerProps} />}>
            <Typography numberOfLines={1} {...typographyProps}>
                {formattedBalance}
            </Typography>
        </Suspense>
    );
};

export default Balance;
