import { ReactNode } from "react";
import { Col, Spinner } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";

export interface WalletBackupBaseDisplayProps {
    onClose: () => void;
    loading: boolean;
    children: ReactNode;
}

const WalletBackupBaseDisplay = ({ onClose, loading, children }: WalletBackupBaseDisplayProps): JSX.Element => {
    const translate = useTranslate();
    if (loading) return <Spinner size="large" />;
    return (
        <Col flex={1} gap={24}>
            <Col flex={1} gap="5%">
                <Advise title={translate("keep_this_safe")} />
                {children}
            </Col>
            <Button fullWidth onPress={onClose}>
                {translate("close")}
            </Button>
        </Col>
    );
};

export default WalletBackupBaseDisplay;
