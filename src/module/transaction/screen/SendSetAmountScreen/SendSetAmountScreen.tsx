import { Col, Form, useSetTab, Suspense } from "@peersyst/react-native-components";
import TextArea from "module/common/component/input/TextArea/TextArea";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import sendRecoilState from "module/transaction/state/SendState";
import { useState } from "react";
import useGetBalance from "module/wallet/query/useGetBalance";
import settingsState from "module/settings/state/SettingsState";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import TokenAmountInput from "../../component/input/TokenAmountInput/TokenAmountInput";
import CenteredLoader from "module/common/component/feedback/CenteredLoader/CenteredLoader";
import { useTranslate } from "module/common/hook/useTranslate";
import WalletAssetSelector from "module/wallet/component/input/WalletAssetSelector/WalletAssetSelector";

export interface SendAmountAndMessageResult {
    amount: string;
    message: string;
    token: string;
}

const SendSetAmountScreen = (): JSX.Element => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const translate = useTranslate();
    const [amount, setAmount] = useState(sendState.amount || "");
    const { fee: feeInDecimals } = useRecoilValue(settingsState);
    const fee = feeInDecimals; //TODO: convert to token
    const { data: balance, isLoading: balanceIsLoading } = useGetBalance(sendState.senderWalletIndex || 0);
    const setTab = useSetTab();

    const handleSubmit = ({ amount, message, token }: SendAmountAndMessageResult): void => {
        setSendState((oldState) => ({ ...oldState, amount, message, fee: fee.toString(), token }));
        setTab(SendScreens.CONFIRMATION);
    };

    return (
        <Suspense isLoading={balanceIsLoading} fallback={<CenteredLoader color="black" />}>
            <Form onSubmit={handleSubmit}>
                <Col gap={24}>
                    <WalletAssetSelector />
                    <TextArea name="message" placeholder={translate("write_a_message")} numberOfLines={7} />
                    <Button type="submit" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Form>
        </Suspense>
    );
};

export default SendSetAmountScreen;
