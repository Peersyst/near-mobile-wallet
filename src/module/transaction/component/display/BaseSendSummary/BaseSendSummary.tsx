import { SendState } from "module/transaction/state/SendState";
import Balance from "module/wallet/component/display/Balance/Balance";
import { ReactElement } from "react";
import { Col } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import Container from "module/common/component/display/Container/Container";
import { config } from "config";
import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { ViewStyle } from "react-native";
import { BalanceOperations } from "near-peersyst-sdk";
import Fee from "../Fee/Fee";

export interface BaseSendSummaryFullProps extends Required<Pick<SendState, "fee" | "token">> {
    amount: string | number;
    children?: ReactElement;
    total?: boolean;
    showFiat?: boolean;
    showFee?: boolean;
    style?: ViewStyle;
}

export type BaseSendSummaryProps = Omit<BaseSendSummaryFullProps, "children">;

const BaseSendSummary = ({
    amount,
    fee,
    token,
    children,
    total,
    showFiat,
    style,
    showFee = true,
}: BaseSendSummaryFullProps): JSX.Element => {
    const translate = useTranslate();
    const { fiat } = useRecoilValue(settingsState);
    const { value: fiatValue } = useNativeTokenConversion(fiat, amount);

    return (
        <Container style={{ width: "100%", ...style }}>
            <Col gap="10%" alignItems="center">
                <Col gap={2} alignItems="center" style={{ width: "100%" }}>
                    <Typography variant="h4Strong" textAlign="center" numberOfLines={1}>
                        <Balance
                            balance={amount}
                            variant="h4Strong"
                            units={token}
                            options={{ maximumFractionDigits: config.maxNumberOfDecimals }}
                        />
                        {showFiat && (
                            <>
                                {" "}
                                <Balance
                                    light
                                    balance={fiatValue}
                                    variant="body2Regular"
                                    action="round"
                                    units={fiat}
                                    options={{ maximumFractionDigits: 2 }}
                                />
                            </>
                        )}
                    </Typography>
                    {showFee && <Fee fee={fee} typographyVariant="body3" />}
                    {total && (
                        <Typography variant="body2Regular" color={(palette) => palette.primary} textAlign="center">
                            {translate("total")}:{" "}
                            <Balance
                                balance={BalanceOperations.add(amount, fee)}
                                variant="body2Strong"
                                units={token}
                                color={(palette) => palette.primary}
                                options={{ maximumFractionDigits: config.maxNumberOfDecimals }}
                            />
                        </Typography>
                    )}
                </Col>
                {children}
            </Col>
        </Container>
    );
};

export default BaseSendSummary;
