import { Col, Form, Typography, useSetTab, Suspense } from "@peersyst/react-native-components";
import TextArea from "module/common/component/input/TextArea/TextArea";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import sendRecoilState from "module/transaction/state/SendState";
import { useState } from "react";
import useGetBalance from "module/wallet/query/useGetBalance";
import settingsState from "module/settings/state/SettingsState";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import TokenAmountInput from "../../component/input/TokenAmountInput/TokenAmountInput";
import { DepositScreens } from "module/dao/component/core/DepositModal/DepositModal";
import CenteredLoader from "module/common/component/feedback/CenteredLoader/CenteredLoader";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";
import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";

export interface SendAmountAndMessageResult {
    amount: string;
    message: string;
}

export interface SendSetAmountScreenProps {
    type?: "dao" | "send";
}

const SendSetAmountScreen = ({ type = "send" }: SendSetAmountScreenProps): JSX.Element => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const translate = useTranslate();
    const [amount, setAmount] = useState(sendState.amount || "");
    const { fee: feeInShannons } = useRecoilValue(settingsState);
    const feeInCKB = convertShannonsToCKB(feeInShannons);
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(sendState.senderWalletIndex || 0);
    const setTab = useSetTab();

    const handleSubmit = ({ amount, message }: SendAmountAndMessageResult): void => {
        setSendState((oldState) => ({ ...oldState, amount, message, fee: feeInCKB.toString() }));
        setTab(type === "send" ? SendScreens.CONFIRMATION : DepositScreens.CONFIRMATION);
    };

    return (
        <Suspense isLoading={balanceIsLoading} fallback={<CenteredLoader color="black" />}>
            <Form onSubmit={handleSubmit}>
                <Col gap={24}>
                    <TokenAmountInput
                        type={type}
                        fee={feeInCKB}
                        amount={amount}
                        setAmount={setAmount}
                        freeBalance={balance?.freeBalance ?? 0}
                    />
                    {type === "dao" ? (
                        <Typography variant="body1" textAlign="center">
                            {translate("deposit_warning", { dao_min_deposit: config.minimumDaoDeposit.toString() })}
                        </Typography>
                    ) : (
                        <TextArea name="message" placeholder={translate("write_a_message")} numberOfLines={7} />
                    )}
                    <Button type="submit" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Form>
        </Suspense>
    );
};

export default SendSetAmountScreen;
