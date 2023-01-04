import { Col, Form, useSetTab, Suspense } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useRecoilState } from "recoil";
import sendRecoilState from "module/transaction/state/SendState";
import useGetBalance from "module/wallet/query/useGetBalance";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import CenteredLoader from "module/common/component/feedback/CenteredLoader/CenteredLoader";
import { useTranslate } from "module/common/hook/useTranslate";
import WalletAssetSelect from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect";

export interface SendAmountAndMessageResult {
    amount: string;
    message: string;
    token: string;
}

const SendSetAmountScreen = (): JSX.Element => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const translate = useTranslate();

    const senderWalletIndex = sendState.senderWalletIndex!;
    const { isLoading: balanceIsLoading } = useGetBalance(senderWalletIndex);
    const setTab = useSetTab();

    const handleSubmit = (res: SendAmountAndMessageResult): void => {
        console.log(res);
    };

    return (
        <Suspense isLoading={balanceIsLoading} fallback={<CenteredLoader color="black" />}>
            <Form onSubmit={handleSubmit}>
                <Col gap={24}>
                    <WalletAssetSelect required index={senderWalletIndex} name="jordi" />
                    <Button type="submit" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Form>
        </Suspense>
    );
};

export default SendSetAmountScreen;
