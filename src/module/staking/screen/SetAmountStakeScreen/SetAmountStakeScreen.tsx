import { Col, Form, useSetTab } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import stakeRecoilState from "module/staking/state/StakeState";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import NEARMaxAmountAvailableTextField from "module/transaction/component/input/NEARMaxAmountAvailableTextField/NEARMaxAmountAvailableTextField";

export interface SendForm {
    amount: string;
}

const SetAmountStakeScreen = () => {
    const translate = useTranslate();
    const [stakeState, setStakeState] = useRecoilState(stakeRecoilState);
    const { index } = useSelectedWallet();

    const setTab = useSetTab();

    const handleSubmit = ({ amount }: SendForm) => {
        setStakeState((oldState) => ({ ...oldState, amount: amount }));
        setTab(SendScreens.AMOUNT_AND_MESSAGE);
    };

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col gap={24} justifyContent="space-between" flex={1}>
                <NEARMaxAmountAvailableTextField
                    defaultValue={stakeState.amount}
                    label={translate("enter_amount_want_to_stake")!}
                    index={index}
                    name="amount"
                    required
                />
                <Button type="submit" fullWidth>
                    {translate("next")}
                </Button>
            </Col>
        </Form>
    );
};

export default SetAmountStakeScreen;
