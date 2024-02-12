import Balance from "module/wallet/component/display/Balance/Balance";
import { ReactElement } from "react";
import { Col } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import Container from "module/common/component/display/Container/Container";
import { ViewStyle } from "react-native";
import { addNearAmounts, NftToken, Token } from "near-peersyst-sdk";
import Fee, { FeeProps } from "../Fee/Fee";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { TotalText } from "./BaseSendSummary.styles";
import { config } from "refactor/common/config";
import { BalanceActions } from "module/wallet/component/display/Balance/Balance.types";

export interface BaseSendSummaryFullProps {
    amount: string | number;
    children?: ReactElement;
    showTotal?: boolean;
    showFiat?: boolean;
    showFee?: boolean;
    style?: ViewStyle;
    fee?: FeeProps["fee"];
    token?: Token;
    nft?: NftToken;
    displayFullDecimals?: boolean;
}

export type BaseSendSummaryProps = Omit<BaseSendSummaryFullProps, "children">;

const BaseSendSummary = ({
    amount,
    fee,
    children,
    showTotal,
    showFiat,
    style,
    token,
    nft,
    showFee = true,
    displayFullDecimals = false,
}: BaseSendSummaryFullProps): JSX.Element => {
    const translate = useTranslate();
    const finalFee = fee ?? config.estimatedFee;
    const totalAmount = showTotal ? addNearAmounts(amount.toString(), finalFee) : "0";
    const amountDecimals = amount.toString().split(".")[1]?.length;
    const totalDecimals = totalAmount.split(".")[1]?.length;
    return (
        <Container style={{ width: "100%", ...style }}>
            <Col gap="10%" alignItems="center">
                <Col gap={2} alignItems="center" style={{ width: "100%" }}>
                    {nft ? (
                        <Typography variant="h4Strong" textAlign="center" numberOfLines={1}>
                            {nft?.metadata.title}
                        </Typography>
                    ) : (
                        <Typography variant="h4Strong" textAlign="center" numberOfLines={2}>
                            <Balance
                                action={BalanceActions.DISPLAY}
                                options={{
                                    ...(displayFullDecimals && {
                                        maximumFractionDigits: amountDecimals,
                                        minimumFractionDigits: amountDecimals,
                                    }),
                                }}
                                balance={amount}
                                variant="h4Strong"
                                units={token?.metadata.symbol ?? "token"}
                            />
                            {showFiat && (
                                <>
                                    {" "}
                                    <FiatBalance light balance={amount} variant="body2Regular" token={token} />
                                </>
                            )}
                        </Typography>
                    )}
                    {showFee && <Fee fee={fee} typographyVariant="body3" />}
                    {showTotal && token === undefined && nft === undefined && (
                        <TotalText variant="body2Regular" textAlign="center" numberOfLines={1}>
                            <>
                                {translate("total")}
                                {" · "}
                                <Balance
                                    options={{
                                        maximumFractionDigits: totalDecimals,
                                        minimumFractionDigits: totalDecimals,
                                    }}
                                    balance={totalAmount}
                                    variant="body2Strong"
                                    units="token"
                                    color="primary"
                                />
                            </>
                        </TotalText>
                    )}
                </Col>
                {children}
            </Col>
        </Container>
    );
};

export default BaseSendSummary;
