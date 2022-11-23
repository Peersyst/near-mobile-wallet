import { BalanceProps } from "./Balance.types";
import Typography from "module/common/component/display/Typography/Typography";
import { Spinner, Suspense } from "@peersyst/react-native-components";
import { useFormatBalance } from "./hook/useFormatBalance";

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
        numberFormatOptions: { maximumFractionDigits: 2, ...options },
        units,
        unitsPosition,
        action,
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
