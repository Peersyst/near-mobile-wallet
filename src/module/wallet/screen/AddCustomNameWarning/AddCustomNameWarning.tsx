import { Col } from "@peersyst/react-native-components";
import GradientNearAccountId from "module/common/component/display/GradientNearAccountId/GradientNearAccountId";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";

const AddCustomNameWarning = ({ submitText, onSubmit }: BaseAddWalletModalScreenProps) => {
    const translate = useTranslate();
    return (
        <Col justifyContent="space-between" flex={1}>
            <Col flex={1} alignItems="center" gap="5%">
                <GradientNearAccountId />
                <Typography variant="body3Strong" light textAlign="center">
                    {translate("add_custom_address_warning")}
                </Typography>
            </Col>
            <Button fullWidth onPress={() => onSubmit()}>
                {submitText || translate("continue")}
            </Button>
        </Col>
    );
};

export default AddCustomNameWarning;
