import { Col } from "@peersyst/react-native-components";

export interface WalletQuizBackupLayoutProps {
    children: React.ReactNode;
    button?: React.ReactNode;
}

const WalletQuizBackupLayout = ({ children, button }: WalletQuizBackupLayoutProps) => {
    return (
        <Col flex={1} gap={24}>
            {children}
            {button && (
                <Col flex={1} justifyContent="flex-end">
                    {button}
                </Col>
            )}
        </Col>
    );
};

export default WalletQuizBackupLayout;
