import { Col, Form, Typography, useSetTab } from "react-native-components";
import { translate } from "locale";
import TextArea from "module/common/component/input/TextArea/TextArea";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import sendRecoilState from "module/transaction/state/SendState";
import { useState } from "react";
import useGetFee from "module/transaction/query/useGetFee";
import useGetBalance from "module/wallet/query/useGetBalance";
import { ActivityIndicator } from "react-native";
import settingsState from "module/settings/state/SettingsState";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import CKBAmountInput from "../../component/input/CKBAmountInput/CKBAmountInput";
import { CKBAmountInputContainer } from "./SendSetAmountScreen.styles";
import Card from "module/common/component/surface/Card/Card";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";

export interface SendAmountAndMessageResult {
    amount: string;
    message: string;
}

interface SendSetAmountScreenProps {
    type?: "dao" | "send";
}

const Loader = (): JSX.Element => {
    return (
        <Col justifyContent="center" style={{ height: 250 }}>
            <ActivityIndicator color="black" size="large" />
        </Col>
    );
};


const SendSetAmountScreen = ({ type = "send" }: SendSetAmountScreenProps): JSX.Element => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const [amount, setAmount] = useState(sendState.amount || "");
    const { fee: selectedFee } = useRecoilValue(settingsState);
    const { data: fee, isLoading: feeIsLoading } = useGetFee(selectedFee);
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(sendState.senderWalletIndex);
    const setTab = useSetTab();

    const handleSubmit = ({ amount, message }: SendAmountAndMessageResult): void => {
        setSendState((oldState) => ({ ...oldState, amount, message, fee }));
        setTab(SendScreens.CONFIRMATION);
    };

    return (
        <ControlledSuspense isLoading={feeIsLoading || balanceIsLoading} fallback={<Loader />}>
            <Form onSubmit={handleSubmit}>
                <Col gap="15%">
                    <CKBAmountInputContainer>
                        <CKBAmountInput fee={fee} amount={amount} setAmount={setAmount} balance={balance} />
                    </CKBAmountInputContainer>
                    {type === "dao" ? (
                        <Card>
                            <Typography variant="body1" textAlign="center">
                                {translate("deposit_warning")}
                            </Typography>
                        </Card>
                    ) : (
                        <TextArea name="message" placeholder={translate("write_a_message")} numberOfLines={7} />
                    )}
                    <Button variant="outlined" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Form>
        </ControlledSuspense>
    );
};

export default SendSetAmountScreen;
