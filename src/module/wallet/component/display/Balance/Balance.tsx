import isHeading from "utils/isHeading";
import { useMemo } from "react";
import { Row } from "react-native-components";
import { BalanceItem } from "./Balance.styles";
import { BalanceProps } from "./Balance.types";
import { extractTextStyles } from "utils/extractTextStyles";
import { useTheme } from "@peersyst/react-native-styled";

const Balance = ({
    balance: balanceProps,
    boldUnits,
    smallBalance,
    action = "display",
    variant,
    units,
    style,
    ...rest
}: BalanceProps): JSX.Element => {
    const balance = balanceProps.split(".");
    const heading = isHeading(variant);
    const { palette } = useTheme();
    const [textStyles, rootStyles] = useMemo(
        () =>
            extractTextStyles({
                ...style,
                ...(action !== "display" && {
                    color: (action === "add" && palette.status.success) || ((action === "subtract" && palette.status.error) as string),
                }),
            }),
        [action, palette.status.error, palette.status.success, style],
    );
    return (
        <Row gap={heading ? 8 : 4} justifyContent="center" alignItems="flex-end" style={rootStyles}>
            {action !== "display" && (
                <BalanceItem action={action} variant={variant} style={textStyles} {...rest}>
                    {action === "add" ? "+" : "-"}
                </BalanceItem>
            )}
            <Row alignItems="flex-end">
                <BalanceItem action={action} style={textStyles} variant={variant} {...rest}>{`${balance[0]}.`}</BalanceItem>
                <BalanceItem variant={variant} style={textStyles} smallBalance={smallBalance} {...rest}>{`${
                    balance[1] || "00"
                }`}</BalanceItem>
            </Row>
            {units && (
                <BalanceItem action={action} style={textStyles} variant={variant} {...rest} fontWeight={boldUnits ? "bold" : "normal"}>
                    {units}
                </BalanceItem>
            )}
        </Row>
    );
};

export default Balance;
