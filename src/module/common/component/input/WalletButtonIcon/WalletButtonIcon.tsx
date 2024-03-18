import { WalletButton } from "./WalletButtonIcon.styles";
import { ReactElement } from "react";
import { ButtonProps, Col, IconButton } from "@peersyst/react-native-components";
import { Placeholder } from "../../display/PinDisplay/PinDisplay.styles";

export interface WalletButtonIconProps extends ButtonProps {
    Icon: ReactElement;
    label: string;
}

const WalletButtonIcon = ({ label, Icon, onPress, ...rest }: WalletButtonIconProps): JSX.Element => {
    return (
        <Col gap={6} alignItems="center">
            <WalletButton onPress={onPress} {...rest}>
                <IconButton style={{ fontSize: 24 }}>{Icon}</IconButton>
            </WalletButton>
            <Placeholder variant="body3Strong">{label}</Placeholder>
        </Col>
    );
};

export default WalletButtonIcon;
