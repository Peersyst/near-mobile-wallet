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
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useAddStake from "module/staking/query/useAddStake";
import SendTransactionModal from "module/transaction/component/feedback/SendTransactionModal/SendTransactionModal";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";

const ConfirmStakingScreen = () => {
    const translate = useTranslate();
    const { validator, amount } = useRecoilValue(stakeRecoilState);
    const setTab = useSetTab();
    const { hideModal } = useModal();
    const { index } = useSelectedWallet();
    const { mutate: addStake, isLoading, isError, isSuccess } = useAddStake(index);

    const handleAddStake = () => {
        addStake({ validatorId: validator.accountId, amount: amount });
    };

    return (
        <SendTransactionModal sendTransaction={handleAddStake} isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
            {({ showModal, isSuccess, isLoading }) => (
                <Col flex={1} gap={12} style={{ height: "100%" }}>
                    <Col flex={1} gap={12}>
                        <Typography variant="body2Strong">{translate("confirm_new_staking_of")}</Typography>
                        <BaseSendSummary
                            amount={amount}
                            fee={config.estimatedFee}
                            showFiat
                            showFee={false}
                            style={{ paddingHorizontal: 16, paddingVertical: 20 }}
                        />
                        <Label variant="body2Strong" label={translate("with")!}>
                            <ValidatorInformation
                                validator={validator}
                                action={translate("edit")!}
                                onPressAction={() => setTab(AddStakeScreens.SELECT_VALIDATOR)}
                            />
                        </Label>
                    </Col>
                    <Col gap={8}>
                        <Button variant="text" fullWidth onPress={() => hideModal(AddStakeModal.id)}>
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
