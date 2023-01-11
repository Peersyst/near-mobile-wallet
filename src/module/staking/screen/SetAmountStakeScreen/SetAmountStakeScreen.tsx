import { Col, Form, useSetTab } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import NEARAmountInput from "module/transaction/component/input/AssetAmountInput/NEARAmountInput/NEARAmountInput";
import useWalletState from "module/wallet/hook/useWalletState";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

export interface SendForm {
    amount: number;
}

const SetAmountStakeScreen = () => {
    const translate = useTranslate();
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const { index } = useSelectedWallet();
    const setTab = useSetTab();

    const handleSubmit = ({ amount }: SendForm) => {
        setSendState((oldState) => ({ ...oldState, senderWalletIndex: amount }));
        setTab(SendScreens.AMOUNT_AND_MESSAGE);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Col gap={24}>
                    <Col>
                        <NEARAmountInput
                            label={translate("enter_amount_want_to_stake")!}
                            hint={translate("success")!}
                            index={index}
                            suffix={<Button variant="text">Max</Button>}
                            required
                        />
                    </Col>
                    <Col gap={8}>
                        <Button type="submit" fullWidth>
                            {translate("next")}
                        </Button>
                    </Col>
                </Col>
            </Form>
        </>
    );
};

export default SetAmountStakeScreen;
