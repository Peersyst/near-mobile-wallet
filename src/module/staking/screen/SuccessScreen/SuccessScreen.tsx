import { Alert, Col } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";

interface SuccessScreenProps {
    onSuccess?: () => void;
}

const SuccessScreen = ({ onSuccess }: SuccessScreenProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <Col flex={1}>
            <Alert type="success" message="Your stake has been succesfully delegated to the validator." />
            <Button variant="primary" fullWidth onPress={() => onSuccess}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default SuccessScreen;
