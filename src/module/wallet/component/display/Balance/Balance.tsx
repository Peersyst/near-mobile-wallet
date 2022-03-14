import isHeading from "utils/isHeading";
import { useMemo } from "react";
import { Row } from "react-native-components";
import { BalanceItem } from "./Balance.styles";
import { BalanceProps } from "./Balance.types";
import { extractTextStyles } from "utils/extractTextStyles";
import { useTheme } from "@peersyst/react-native-styled";
import formatNumber from "utils/formatNumber";

const Balance = ({
    balance: balanceProps,
    boldUnits,
    smallBalance,
    action = "display",
    variant,
    units,
    style,
    decimals = 2,
    ...rest
}: BalanceProps): JSX.Element => {
    const balance = formatNumber(balanceProps, { split: true, minDecimals: decimals, maxDecimals: decimals });
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
                <BalanceItem variant={variant} style={textStyles} {...rest}>
                    {action === "add" ? "+" : "-"}
                </BalanceItem>
            )}
            <Row alignItems="flex-end">
                <BalanceItem style={textStyles} variant={variant} {...rest}>{`${balance[0]}`}</BalanceItem>
                {balance[2] && (
                    <>
                        <BalanceItem style={textStyles} variant={variant} {...rest}>{`${balance[1]}`}</BalanceItem>
                        <BalanceItem
                            variant={variant}
                            style={textStyles}
                            smallBalance={smallBalance}
                            {...rest}
                        >{`${balance[2]}`}</BalanceItem>
                    </>
                )}
            </Row>
            {units && (
                <BalanceItem style={textStyles} variant={variant} {...rest} fontWeight={boldUnits ? "bold" : "normal"}>
                    {units}
                </BalanceItem>
            )}
        </Row>
    );
};

export default Balance;
