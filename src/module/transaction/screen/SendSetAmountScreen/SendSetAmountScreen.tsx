import { Col, Form, useSetTab, Suspense } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState } from "recoil";
import sendRecoilState, { SendState } from "module/transaction/state/SendState";
import useGetBalance from "module/wallet/query/useGetBalance";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import CenteredLoader from "module/common/component/feedback/CenteredLoader/CenteredLoader";
import { useTranslate } from "module/common/hook/useTranslate";
import WalletAssetSelect from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect";
import AssetAmountInput from "module/transaction/component/input/AssetAmountInput/AssetAmountInput";
import { useState } from "react";

export type SendAmountAndMessageResult = Pick<SendState, "amount" | "asset">;

export const SEND_SET_AMOUNT_FORM_KEYS: Partial<Record<keyof SendState, keyof SendState>> = {
    asset: "asset",
    amount: "amount",
};

const SendSetAmountScreen = (): JSX.Element => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const [asset, setAsset] = useState(sendState.asset);
    const translate = useTranslate();

    const senderWalletIndex = sendState.senderWalletIndex!;
    const { isLoading: balanceIsLoading } = useGetBalance(senderWalletIndex);
    const setTab = useSetTab();

    const handleSubmit = (res: SendAmountAndMessageResult): void => {
        setSendState((oldState) => {
            console.log(oldState);
            return {
                ...oldState,
                res,
            };
        });
        setTab(SendScreens.CONFIRMATION);
    };

    return (
        <Suspense isLoading={balanceIsLoading} fallback={<CenteredLoader color="black" />}>
            <Form onSubmit={handleSubmit}>
                <Col gap={24}>
                    <WalletAssetSelect
                        label={translate("choose_what_to_send")}
                        onChange={(asset) => setAsset(asset)}
                        value={asset}
                        index={senderWalletIndex}
                        name={SEND_SET_AMOUNT_FORM_KEYS.asset}
                    />
                    <AssetAmountInput
                        label={translate("select_the_amount_to_send")}
                        asset={asset}
                        placeholder={translate("enter_amount")}
                        name={SEND_SET_AMOUNT_FORM_KEYS.amount}
                        index={sendState.senderWalletIndex}
                    />
                    <Button type="submit" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Form>
        </Suspense>
    );
};

export default SendSetAmountScreen;
