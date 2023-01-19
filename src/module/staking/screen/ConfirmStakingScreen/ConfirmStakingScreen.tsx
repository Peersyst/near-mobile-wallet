import { Col, Label, useModal, useSetTab } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import BaseSendSummary from "module/transaction/component/display/BaseSendSummary/BaseSendSummary";
import { config } from "config";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";
import AddStakeModal, { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import Button from "module/common/component/input/Button/Button";
import SendTransactionModal from "module/transaction/component/feedback/SendTransactionModal/SendTransactionModal";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { SendTransactionModalProps } from "module/transaction/component/feedback/SendTransactionModal/SendTransactionModal.types";

export interface ConfirmStakingScreenProps extends Omit<SendTransactionModalProps, "children" | "onExited"> {
    label: string;
    onCancel?: () => void;
    onEditValidator?: () => void;
    onExited?: () => void;
}

const ConfirmStakingScreen = ({ label, onCancel, onEditValidator, ...rest }: ConfirmStakingScreenProps) => {
    const translate = useTranslate();
    const { validator, amount } = useRecoilValue(stakeRecoilState);

    return (
        <SendTransactionModal {...rest}>
            {({ showModal, isSuccess, isLoading }) => (
                <Col flex={1} gap={12} style={{ height: "100%" }}>
                    <Col flex={1} gap={12}>
                        <Typography variant="body2Strong">{label}</Typography>
                        <BaseSendSummary
                            amount={amount}
                            fee={config.estimatedFee}
                            showFiat
                            showFee={false}
                            showTotal={false}
                            style={{ paddingHorizontal: 16, paddingVertical: 20 }}
                        />
                        <Label variant="body2Strong" label={translate("with")!}>
                            <ValidatorInformation validator={validator} action={translate("edit")!} onPressAction={onEditValidator} />
                        </Label>
                    </Col>
                    <Col gap={8}>
                        <Button variant="text" fullWidth onPress={onCancel}>
                            {translate("cancel")}
                        </Button>
                        <CountdownButton loading={isLoading} disabled={isSuccess} seconds={5} fullWidth onPress={showModal}>
                            {translate("next")}
                        </CountdownButton>
                    </Col>
                </Col>
            )}
        </SendTransactionModal>
    );
};

export default ConfirmStakingScreen;
