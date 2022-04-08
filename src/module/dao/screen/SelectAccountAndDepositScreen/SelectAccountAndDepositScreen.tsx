import { Col, Form, useSetTab } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { WithdrawForm, WithdrawScreens } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import SelectDeposit from "./SelectDeposit";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";
import { WithdrawSelectorCard } from "./SelectAccountAndDepositScreen.styles";
import { Dispatch, SetStateAction } from "react";
import useWalletState from "module/wallet/hook/useWalletState";

interface WithdrawSelectAccountScreenProps {
    setDepositInfo: Dispatch<SetStateAction<WithdrawForm | undefined>>;
}

const SelectAccountAndDepositScreen = ({ setDepositInfo }: WithdrawSelectAccountScreenProps) => {
    const setTab = useSetTab();
    const handleSubmit = (depositInfo: WithdrawForm) => {
        setDepositInfo(depositInfo);
        setTab(WithdrawScreens.CONFIRMATION);
    };
    const { data = [], isLoading } = useGetDAOUnlockableAmounts();
    const {
        state: { selectedWallet },
        setSelectedWallet,
    } = useWalletState();

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Col gap={20}>
                    <WithdrawSelectorCard style={{ marginTop: 5 }}>
                        <FormGroup label={translate("select_a_wallet") + ":"}>
                            <WalletSelector
                                required
                                name="receiver"
                                value={selectedWallet}
                                onChange={(index) => setSelectedWallet(index as number)}
                            />
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

export default SelectAccountAndDepositScreen;
