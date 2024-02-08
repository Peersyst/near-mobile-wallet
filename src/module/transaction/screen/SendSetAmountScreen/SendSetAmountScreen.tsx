import { Col, Form, useSetTab, Suspense } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState } from "recoil";
import sendRecoilState, { SendState } from "module/transaction/state/SendState";
import useGetBalance from "module/wallet/query/useGetBalance";
import CenteredLoader from "module/common/component/feedback/CenteredLoader/CenteredLoader";
import { useTranslate } from "module/common/hook/useTranslate";
import WalletAssetSelect from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect";
import AssetAmountTextField from "module/transaction/component/input/AssetAmountTextField/AssetAmountTextField";
import { useState } from "react";
import { Asset } from "module/wallet/wallet.types";
import { AssetType } from "module/wallet/wallet.types";
import { SendScreens } from "../SendScreens.types";

export type SendAmountAndMessageResult = Pick<SendState, "amount" | "asset">;

export const SEND_SET_AMOUNT_FORM_KEYS: Partial<Record<keyof SendState, keyof SendState>> = {
    asset: "asset",
    amount: "amount",
};

const SendSetAmountScreen = (): JSX.Element => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    /**
     * asset will never be undefined because by default sendRecoilState has it defined
     * (check the recoil defaultState of sendState)
     */
    const [asset, setAsset] = useState<Asset | undefined>(sendState.asset);
    const [amount, setAmount] = useState<string | undefined>(sendState.amount?.toString() ?? undefined);
    const translate = useTranslate();

    const senderWalletIndex = sendState.senderWalletIndex!;
    const { isLoading: balanceIsLoading } = useGetBalance(senderWalletIndex);
    const setTab = useSetTab();

    const handleSubmit = (res: SendAmountAndMessageResult): void => {
        setSendState((oldState) => ({
            ...oldState,
            ...res,
        }));
        setTab(SendScreens.CONFIRMATION);
    };

    const handleAssetChange = (asset: Asset | undefined): void => {
        setAsset(asset);
        setAmount("");
    };

    return (
        <Suspense isLoading={balanceIsLoading} fallback={<CenteredLoader color="black" />}>
            <Form onSubmit={handleSubmit}>
                <Col gap={24}>
                    <WalletAssetSelect
                        label={translate("choose_what_to_send")}
                        onChange={handleAssetChange}
                        value={asset}
                        index={senderWalletIndex}
                        name={SEND_SET_AMOUNT_FORM_KEYS.asset}
                    />
                    <AssetAmountTextField
                        hideError={amount === ""}
                        value={amount}
                        onChange={(amount) => setAmount(amount)}
                        label={translate("select_the_amount_to_send")}
                        asset={asset ?? { type: AssetType.TOKEN }}
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
