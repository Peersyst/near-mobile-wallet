import { BalanceProps } from "./Balance.types";
import Typography from "module/common/component/display/Typography/Typography";
import { Spinner, Suspense } from "@peersyst/react-native-components";
import { useFormatBalance } from "./hook/useFormatBalance";
import { BALANCE_THRESHOLDS } from "module/wallet/component/display/Balance/constants/balanceThresholds";
import { BalanceRoot } from "./Balance.styles";
import { extractTextStyles } from "utils/extractTextStyles";

const Balance = ({
    balance,
    options,
    units,
    unitsPosition = "right",
    action,
    isLoading = false,
    minimumFallbackDisplay,
    spinnerProps,
    style = {},
    variant,
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

    const [textStyle, rootStyle] = extractTextStyles(style);

    return (
        <BalanceRoot variant={variant} style={rootStyle}>
            <Suspense isLoading={isLoading} fallback={<Spinner {...spinnerProps} />}>
                <Typography style={textStyle} variant={variant} {...typographyProps}>
                    {formattedBalance}
                </Typography>
            </Suspense>
        </BalanceRoot>
    );
};

export default Balance;
