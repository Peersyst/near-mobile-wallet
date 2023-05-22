import { Col, Form } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import stakeRecoilState from "module/staking/state/StakeState";
import { useRecoilState } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import NEARAmountWithMaxTextField from "module/transaction/component/input/NEARAmountWithMaxTextField/NEARAmountWithMaxTextField";
import { ReactElement } from "react";

export interface StakeForm {
    amount: string;
}

export interface StakingSetAmountScreenProps {
    maxAmount?: string; //without taking into consideration the fee
    fee?: string;
    label: string;
    children?: ReactElement;
    onSubmit?: (amount: string) => void;
    disabled?: boolean;
}

const StakingSetAmountScreen = ({ maxAmount, label, children, onSubmit, fee, disabled }: StakingSetAmountScreenProps) => {
    const translate = useTranslate();
    const [stakeState, setStakeState] = useRecoilState(stakeRecoilState);
    const { index } = useSelectedWallet();

    const handleSubmit = ({ amount }: StakeForm) => {
        setStakeState((oldState) => ({ ...oldState, amount: amount }));
        onSubmit?.(amount);
    };

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col flex={1} gap={24}>
                <Col gap={24} flex={1}>
                    <Col gap="2%">
                        <NEARAmountWithMaxTextField
                            placeholder={translate("enter_amount")!}
                            defaultValue={stakeState.amount}
                            label={label}
                            index={index}
                            name="amount"
                            required
                            fee={fee}
                            maxAmount={maxAmount}
                        />
                    </Col>
                    {children}
                </Col>
                <Button type="submit" fullWidth disabled={disabled}>
                    {translate("next")}
                </Button>
            </Col>
        </Form>
    );
};

export default StakingSetAmountScreen;
