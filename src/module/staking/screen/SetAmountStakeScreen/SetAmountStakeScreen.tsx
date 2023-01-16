import { Col, Form, useSetTab } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import stakeRecoilState from "module/staking/state/StakeState";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useGetBalance from "module/wallet/query/useGetBalance";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { useState } from "react";
import { config } from "config";
import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import { subtractNearAmounts } from "near-peersyst-sdk";
import settingsState from "module/settings/state/SettingsState";
import NEARAmountTextField from "module/transaction/component/input/AssetAmountTextField/NEARAmountTextField/NEARAmountTextField";

export interface SendForm {
    amount: string;
}

const SetAmountStakeScreen = () => {
    const translate = useTranslate();
    const [amount, setAmount] = useState("");
    const [, setStakeState] = useRecoilState(stakeRecoilState);
    const { index } = useSelectedWallet();
    const { data: { available } = { available: "0" } } = useGetBalance(index);
    const setTab = useSetTab();
    const { fiat } = useRecoilValue(settingsState);

    const handleSubmit = ({ amount }: SendForm) => {
        setStakeState((oldState) => ({ ...oldState, amount: amount }));
        setTab(SendScreens.AMOUNT_AND_MESSAGE);
    };

    const maxBalance = subtractNearAmounts(available, config.estimatedFee);

    const maxBalanceInFiat = useNativeTokenConversion(maxBalance);

    const formattedBalanceInFiat = useFormatBalance(maxBalanceInFiat.value, {
        numberFormatOptions: { maximumFractionDigits: 2 },
        units: fiat,
        action: "round",
    });

    const formattedBalance = useFormatBalance(maxBalance, {
        numberFormatOptions: { maximumFractionDigits: 2 },
    });

    const changeToMaxBalance = () => {
        setStakeState((oldState) => ({ ...oldState, amount: maxBalance }));
        setAmount(String(maxBalance));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Col gap={24}>
                <NEARAmountTextField
                    label={translate("enter_amount_want_to_stake")!}
                    hint={translate("available_balance", { amount: formattedBalance, amount_price: formattedBalanceInFiat })!}
                    index={index}
                    name="amount"
                    suffix={
                        <Button variant="text" onPress={() => changeToMaxBalance()}>
                            {translate("max")!}
                        </Button>
                    }
                    value={amount}
                    onChange={setAmount}
                    required
                />
                <Col gap={8}>
                    <Button type="submit" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Col>
        </Form>
    );
};

export default SetAmountStakeScreen;
