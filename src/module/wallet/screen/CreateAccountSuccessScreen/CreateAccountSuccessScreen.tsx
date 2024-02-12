import { Col } from "@peersyst/react-native-components";
import StatusIcon from "module/common/component/display/StatusIcon/StatusIcons";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";

const CreateAccountSuccessScreen = ({ submitText, onSubmit }: BaseAddWalletModalScreenProps) => {
    const translate = useTranslate();
    return (
        <Col flex={1} justifyContent="space-between">
            <Col alignItems="center" gap="2.5%">
                <StatusIcon status="valid" style={{ fontSize: 30 }} />
                <Typography variant="body2Strong" light>
                    {translate("create_account_success")}
                </Typography>
            </Col>
            <Button fullWidth onPress={onSubmit}>
                {submitText || translate("close")}
            </Button>
        </Col>
    );
};

export default CreateAccountSuccessScreen;
