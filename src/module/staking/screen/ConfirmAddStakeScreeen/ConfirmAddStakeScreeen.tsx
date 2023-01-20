import { Col, Label } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import { config } from "config";
import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import Button from "module/common/component/input/Button/Button";
import SendTransactionModal from "module/transaction/component/feedback/SendTransactionModal/SendTransactionModal";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { SendTransactionModalProps } from "module/transaction/component/feedback/SendTransactionModal/SendTransactionModal.types";
import BaseSendSummary from "module/transaction/component/display/BaseSendSummary/BaseSendSummary";

export interface ConfirmAddStakeScreeenProps extends Omit<SendTransactionModalProps, "children" | "onExited"> {
    label: string;
    onCancel?: () => void;
    onEditValidator?: () => void;
    onExited?: () => void;
}

const ConfirmAddStakeScreeen = ({ label, onCancel, onEditValidator, ...rest }: ConfirmAddStakeScreeenProps) => {
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
                            style={{ paddingHorizontal: 16, paddingVertical: 20 }}
                        />
                        <Label variant="body2Strong" label={translate("with")!}>
                            <ValidatorInformation validator={validator} showEdit onEdit={onEditValidator} />
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

export default ConfirmAddStakeScreeen;
