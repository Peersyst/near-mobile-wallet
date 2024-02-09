import { useTranslate } from "module/common/hook/useTranslate";
import { Col, Label, useSetTab } from "@peersyst/react-native-components";
import { useRecoilState, useResetRecoilState } from "recoil";
import stakeState from "module/staking/state/StakeState";
import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";
import StakingSetAmountScreen from "../StakingSetAmountScreen";
import Alert from "module/common/component/feedback/Alert/Alert";
import useCanPayNearAmount from "module/wallet/query/useCanPayNearAmount";
import { config } from "refactor/common/config";

const UnstakeSetAmountScreen = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const setTab = useSetTab();

    const [{ validator }] = useRecoilState(stakeState);
    const resetStakeState = useResetRecoilState(stakeState);
    const canPayTheFee = useCanPayNearAmount({ amount: config.estimatedFee });
    const disabled = !canPayTheFee;

    const handleSubmit = () => setTab(UnstakeModalScreens.CONFIRM_VALIDATOR);
    const onEditAction = () => {
        resetStakeState();
        setTab(UnstakeModalScreens.SELECT_VALIDATOR);
    };

    return (
        <StakingSetAmountScreen
            fee="0"
            maxAmount={validator?.stakingBalance?.staked}
            label={translate("enter_amount_want_to", { action: "unstake" })}
            onSubmit={handleSubmit}
            disabled={disabled}
        >
            <Col flex={1} justifyContent="space-between" style={{ height: "100%" }}>
                <Label label={translate("from")!}>
                    <ValidatorInformation validator={validator} showEdit onEdit={onEditAction} />
                </Label>
                {disabled && (
                    <Col>
                        <Alert type="error" content={translateError("insufficient_balance", { minBalance: config.estimatedFee })} />
                    </Col>
                )}
            </Col>
        </StakingSetAmountScreen>
    );
};

export default UnstakeSetAmountScreen;
