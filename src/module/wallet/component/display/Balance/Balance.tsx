import { BalanceActions, BalanceProps } from "./Balance.types";
import Typography from "module/common/component/display/Typography/Typography";
import { Spinner, Suspense } from "@peersyst/react-native-components";
import { useFormatBalance } from "./hook/useFormatBalance";
import { THRESHOLDS } from "module/wallet/component/display/Balance/constants/balanceThresholds";
import { memo } from "react";

const Balance = ({
    balance,
    options,
    units,
    unitsPosition = "right",
    action,
    isLoading = false,
    minimumFallbackDisplay,
    spinnerProps,
    thresholds = THRESHOLDS,
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
