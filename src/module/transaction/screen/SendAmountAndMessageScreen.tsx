import TextField from "module/common/component/input/TextField/TextField";
import { Col, Form, NumericInput, Row, Typography } from "react-native-components";
import { translate } from "locale";
import TextArea from "module/common/component/input/TextArea/TextArea";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import sendRecoilState from "module/transaction/state/SendState";
import { useState } from "react";
import useGetFee from "module/transaction/query/useGetFee";
import useGetBalance from "module/wallet/query/useGetBalance";
import { ActivityIndicator } from "react-native";
import { MINIMUM_TRANSACTION_AMOUNT } from "@env";
import settingsState from "module/settings/state/SettingsState";

export interface SendAmountAndMessageResult {
    amount: string;
    message: string;
}

const SendAmountAndMessageScreen = (): JSX.Element => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const [amount, setAmount] = useState(sendState.amount || "");
    const { fee: selectedFee } = useRecoilValue(settingsState);
    const { data: fee, isLoading: feeIsLoading } = useGetFee(selectedFee);
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(sendState.senderAddress!);

    if (feeIsLoading || balanceIsLoading) {
        return (
            <Col justifyContent="center" style={{ height: 250 }}>
                <ActivityIndicator color="black" size="large" />
            </Col>
        );
    }

    const handleSubmit = ({ amount, message }: SendAmountAndMessageResult): void => {
        setSendState((oldState) => ({ ...oldState, amount, message }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Col gap="15%">
                <Row alignItems="center" style={{ marginHorizontal: 20, marginTop: "15%" }}>
                    <TextField
                        variant="underlined"
                        size="lg"
                        hint={translate("transaction_fee", { fee: fee || "-" })}
                        value={amount}
                        onChange={setAmount}
                        name="amount"
                        validators={`not-null|gte${MINIMUM_TRANSACTION_AMOUNT}:${translate("minimum_transaction_amount_text", {
                            amount: MINIMUM_TRANSACTION_AMOUNT,
                        })}|lte${Number(balance) - Number(fee)}:${translate("insufficient_balance")}`}
                        suffix={
                            <Typography variant="h1" fontWeight="bold">
                                CKB
                            </Typography>
                        }
                        errorElement={<></>}
                        input={NumericInput}
                        placeholder={translate("enter_amount")}
                    />
                </Row>
                <TextArea name="message" placeholder={translate("write_a_message")} numberOfLines={7} />
                <Button variant="outlined" fullWidth>
                    {translate("next")}
                </Button>
            </Col>
        </Form>
    );
};

export default SendAmountAndMessageScreen;
