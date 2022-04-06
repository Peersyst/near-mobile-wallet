import { Col, Form, Paper, Row, useSetTab } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { useRecoilState } from "recoil";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { WithdrawScreens } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";

export interface WithdrawForm {
    sender: number;
}

const WithdrawSelectAccountScreen = () => {
    const setTab = useSetTab();
    const handleSubmit = ({ sender }: WithdrawForm) => {
        setTab(WithdrawScreens.CONFIRMATION);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Col gap={20}>
                    <Paper style={{ padding: 20 }} elevation={8}>
                        <FormGroup label={translate("select_a_wallet") + ":"}>
                            <WalletSelector required name="withdraw" />
                        </FormGroup>
                    </Paper>
                    <Paper style={{ padding: 20 }} elevation={8}>
                        <FormGroup label={translate("select_deposit") + ":"}>
                            <ControlledSuspense isLoading={false} activityIndicatorSize={30}>
                                <WalletSelector required name="withdraw" />
                            </ControlledSuspense>
                        </FormGroup>
                    </Paper>
                    <Button variant="outlined" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Col>
        </Form>
    );
};

export default WithdrawSelectAccountScreen;
