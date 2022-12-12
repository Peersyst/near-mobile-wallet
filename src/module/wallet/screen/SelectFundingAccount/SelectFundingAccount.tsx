import { Col, Form, Row } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";

const SelectFundingAccount = ({ onSubmit, submitText }: BaseAddWalletModalScreenProps) => {
    const translate = useTranslate();

    const handleSubmit = () => {
        onSubmit?.();
    };
    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col gap="10%" flex={1} justifyContent="space-between">
                <Col flex={1} justifyContent="space-between">
                    <Row wrap>
                        <Typography variant="body3Regular" light textAlign="center">
                            {translate("select_funding_acc_explanation_1")}
                            <Typography variant="body3Strong" light>
                                0.1 NEAR.
                            </Typography>
                            {translate("select_funding_acc_explanation_2")}
                        </Typography>
                    </Row>
                </Col>
                <Button fullWidth type="submit">
                    {submitText}
                </Button>
            </Col>
        </Form>
    );
};

export default SelectFundingAccount;
