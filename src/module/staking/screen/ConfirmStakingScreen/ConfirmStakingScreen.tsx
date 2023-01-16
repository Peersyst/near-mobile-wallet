import { Col, Label, useModal, useSetTab } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import BaseSendSummary from "module/transaction/component/display/BaseSendSummary/BaseSendSummary";
import { config } from "config";
import settingsState from "module/settings/state/SettingsState";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";
import AddStakeModal, { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import Button from "module/common/component/input/Button/Button";

const ConfirmStakingScreen = () => {
    const translate = useTranslate();
    const [stakeState] = useRecoilState(stakeRecoilState);
    const setTab = useSetTab();
    const { fiat } = useRecoilValue(settingsState);
    const { hideModal } = useModal();
    return (
        <Col flex={1} gap={12} style={{ height: "100%" }}>
            <Col flex={1} gap={12}>
                <Typography variant="body2Strong">{translate("confirm_new_staking_of")}</Typography>
                <BaseSendSummary
                    amount={stakeState.amount}
                    fee={config.estimatedFee}
                    token={fiat}
                    showFiat
                    showFee={false}
                    style={{ paddingHorizontal: 16, paddingVertical: 20 }}
                />
                <Label variant="body2Strong" label={translate("with")}>
                    <ValidatorInformation
                        validator={stakeState.validator}
                        action={translate("edit")}
                        onPressAction={() => setTab(AddStakeScreens.SELECT_VALIDATOR)}
                    />
                </Label>
            </Col>
            <Col gap={8}>
                <Button variant="text" fullWidth onPress={() => hideModal(AddStakeModal.id)}>
                    {translate("cancel")}
                </Button>
                <Button type="submit" fullWidth>
                    {translate("next")}
                </Button>
            </Col>
        </Col>
    );
};

export default ConfirmStakingScreen;
