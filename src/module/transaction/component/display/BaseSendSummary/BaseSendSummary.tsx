import Balance from "module/wallet/component/display/Balance/Balance";
import { ReactElement } from "react";
import { Col } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import Container from "module/common/component/display/Container/Container";
import { ViewStyle } from "react-native";
import { addNearAmounts, BalanceOperations, NftToken, Token } from "near-peersyst-sdk";
import Fee, { FeeProps } from "../Fee/Fee";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { TotalText } from "./BaseSendSummary.styles";
import { config } from "config";

export interface BaseSendSummaryFullProps {
    amount: string | number;
    children: ReactElement;
    showTotal?: boolean;
    showFiat?: boolean;
    style?: ViewStyle;
    fee?: FeeProps["fee"];
    token?: Token;
    nft?: NftToken;
}

export type BaseSendSummaryProps = Omit<BaseSendSummaryFullProps, "children">;

const BaseSendSummary = ({ amount, fee, children, showTotal, showFiat, style, token, nft }: BaseSendSummaryFullProps): JSX.Element => {
    const translate = useTranslate();
    const finalFee = fee ?? config.estimatedFee;
    const feeDecimals = finalFee.split(".")[1]?.length ?? 0;
    return (
        <Container style={{ width: "100%", ...style }}>
            <Col gap="10%" alignItems="center">
                <Col gap={2} alignItems="center" style={{ width: "100%" }}>
                    {nft ? (
                        <Typography variant="h4Strong" textAlign="center" numberOfLines={1}>
                            {nft?.metadata.title}
                        </Typography>
                    ) : (
                        <Typography variant="h4Strong" textAlign="center" numberOfLines={1}>
                            <Balance balance={amount} variant="h4Strong" units={token?.metadata.symbol ?? "token"} />
                            {showFiat && (
                                <>
                                    {" "}
                                    <FiatBalance light balance={amount} variant="body2Regular" token={token} />
                                </>
                            )}
                        </Typography>
                    )}
                    <Fee fee={fee} tag="body3" />
                    {showTotal && token === undefined && nft === undefined && (
                        <TotalText variant="body2Regular" textAlign="center" numberOfLines={1}>
                            <>
                                {translate("total")}
                                {" · "}
                                <TotalText
                                    as={Balance}
                                    options={{ maximumFractionDigits: feeDecimals, minimumFractionDigits: feeDecimals }}
                                    light
                                    balance={addNearAmounts(amount.toString(), finalFee).toString()}
                                    variant="body2Strong"
                                    units="token"
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
