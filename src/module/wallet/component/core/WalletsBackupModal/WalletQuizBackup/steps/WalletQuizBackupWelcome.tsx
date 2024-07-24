import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import WalletQuizBackupLayout from "./WalletQuizBackupLayout";
import { SecurityQuizIcon } from "icons";
import { WalletQuizBackupIcon } from "./WalletQuizBackupWelcome.styles";
import { Col } from "@peersyst/react-native-components";

export interface WalletQuizBackupWelcomeProps {
    onNext: () => void;
}

const WalletQuizBackupWelcome = ({ onNext }: WalletQuizBackupWelcomeProps) => {
    const translate = useTranslate();
    return (
        <WalletQuizBackupLayout
            button={
                <Button variant="primary" onPress={onNext} fullWidth>
                    {translate("startQuiz")}
                </Button>
            }
        >
            <Col justifyContent="center" alignItems="center" flex={1} gap={40}>
                <Typography variant="body2Regular">{translate("welcomeSecurityQuiz")}</Typography>
                <WalletQuizBackupIcon>
                    <SecurityQuizIcon />
                </WalletQuizBackupIcon>
            </Col>
        </WalletQuizBackupLayout>
    );
};

export default WalletQuizBackupWelcome;
