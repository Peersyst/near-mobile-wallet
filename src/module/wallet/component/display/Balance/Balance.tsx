import { BalanceProps } from "./Balance.types";
import Typography from "module/common/component/display/Typography/Typography";
import { Spinner, Suspense } from "@peersyst/react-native-components";
import { useFormatBalance } from "./hook/useFormatBalance";
import { Thresholds } from "module/wallet/component/display/Balance/BalanceThresholds";

const Balance = ({
    balance,
    options,
    units,
    unitsPosition = "right",
    action = "display",
    isLoading = false,
    spinnerProps,
    ...typographyProps
}: BalanceProps): JSX.Element => {
    const formattedBalance = useFormatBalance(balance, {
        numberFormatOptions: { ...options },
        units,
        unitsPosition,
        action,
        thresholds: Thresholds,
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
