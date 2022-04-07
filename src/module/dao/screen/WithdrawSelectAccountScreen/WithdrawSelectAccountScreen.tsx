import { Col, Form, Paper, useSetTab } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { WithdrawScreens } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import SelectDeposit from "./SelectDeposit";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import { WithdrawSelectorCard } from "./WithdrawSelectAccountScreen.styles";

export interface WithdrawForm {
    sender: number;
    amount: number;
}

const WithdrawSelectAccountScreen = () => {
    const setTab = useSetTab();
    const handleSubmit = ({ sender, amount }: WithdrawForm) => {
        setTab(WithdrawScreens.CONFIRMATION);
    };
    const { data = [], isLoading } = useGetDAOUnlockableAmounts();

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Col gap={20}>
                    <WithdrawSelectorCard style={{ marginTop: 5 }}>
                        <FormGroup label={translate("select_a_wallet") + ":"}>
                            <WalletSelector required name="sender" />
                        </FormGroup>
                    </WithdrawSelectorCard>
                    <WithdrawSelectorCard>
                        <SelectDeposit />
                    </WithdrawSelectorCard>
                    <Button variant="outlined" fullWidth disabled={isLoading || data.length === 0}>
                        {translate("next")}
                    </Button>
                </Col>
            </Col>
        </Form>
    );
};

export default WithdrawSelectAccountScreen;
