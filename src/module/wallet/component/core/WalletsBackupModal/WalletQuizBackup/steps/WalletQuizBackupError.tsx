import Button from "module/common/component/input/Button/Button";
import WalletQuizBackupLayout from "./WalletQuizBackupLayout";
import useTranslate from "module/common/hook/useTranslate";
import Error from "module/common/component/display/Error/Error";

export interface WalletQuizBackupErrorProps {
    onClose: () => void;
    error: string;
}

const WalletQuizBackupError = ({ onClose, error }: WalletQuizBackupErrorProps) => {
    const translateError = useTranslate("error");
    return (
        <WalletQuizBackupLayout
            button={
                <Button variant="primary" onPress={onClose} fullWidth>
                    {translateError("tryAgain")}
                </Button>
            }
        >
            <Error title={translateError("errorInWalletBackupQuizTitle")} description={error} />
        </WalletQuizBackupLayout>
    );
};

export default WalletQuizBackupError;
