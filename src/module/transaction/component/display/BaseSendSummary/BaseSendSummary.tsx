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
import Fee, { FeeProps } from "../Fee/Fee";

export interface BaseSendSummaryFullProps {
    amount: string | number;
    children: ReactElement;
    total?: boolean;
    showFiat?: boolean;
    style?: ViewStyle;
    fee?: FeeProps["fee"];
}

export type BaseSendSummaryProps = Omit<BaseSendSummaryFullProps, "children">;

const BaseSendSummary = ({ amount, fee, children, total, showFiat, style }: BaseSendSummaryFullProps): JSX.Element => {
    const translate = useTranslate();
    const { fiat } = useRecoilValue(settingsState);
    const { value: fiatValue } = useNativeTokenConversion(fiat, amount);

    return (
        <Container style={{ width: "100%", ...style }}>
            <Col gap="10%" alignItems="center">
                <Col gap={2} alignItems="center" style={{ width: "100%" }}>
                    <Typography variant="h4Strong" textAlign="center" numberOfLines={1}>
                        {/*  <Balance
                            balance={amount}
                            variant="h4Strong"
                            units={"token"}
                            options={{ maximumFractionDigits: config.maxNumberOfDecimals }}
                        /> */}
                        {showFiat && (
                            <>
                                {" "}
                                {/*   <Balance
                                    light
                                    balance={fiatValue}
                                    variant="body2Regular"
                                    action="round"
                                    units={fiat}
                                    options={{ maximumFractionDigits: 2 }}
                                /> */}
                            </>
                        )}
                    </Typography>
                    {/*  <Fee fee={fee} tag="body3" /> */}
                </Col>
                {children}
            </Col>
        </Container>
    );
};

export default BaseSendSummary;
