import isHeading from "module/common/component/base/display/Typography/utils/isHeading";
import { useMemo } from "react";
import { Row } from "react-native-components";
import { BalanceItem } from "./Balance.styles";
import { BalanceProps } from "./Balance.types";
import { extractTextStyles } from "utils/extractTextStyles";

const Balance = ({
    balance: balanceProps,
    tokenBold,
    unitsBold,
    smallBalance,
    action = "display",
    variant,
    units,
    style,
}: BalanceProps): JSX.Element => {
    const balance = balanceProps.split(".");
    const heading = isHeading(variant);
    const [textStyles, rootStyles] = useMemo(() => extractTextStyles({ ...style }), [style]);
    return (
        <Row gap={heading ? 8 : 4} justifyContent="center" alignItems="flex-end" style={rootStyles}>
            {(action !== "display") && (
                <BalanceItem action={action} variant={variant} bold={unitsBold} style={textStyles}>
                    {action === "add" ? "+" : "-"}
                </BalanceItem>
            )}
            <Row alignItems="flex-end">
                <BalanceItem action={action} style={textStyles} variant={variant} bold={unitsBold}>{`${balance[0]}.`}</BalanceItem>
                <BalanceItem variant={variant} style={textStyles} bold={unitsBold} smallBalance={smallBalance}>{`${balance[1]}`}</BalanceItem>
            </Row>
            {units && (
                <BalanceItem action={action} style={textStyles} variant={variant} bold={tokenBold}>
                    {units}
                </BalanceItem>
            )}
        </Row>
    );
};

export default Balance;
