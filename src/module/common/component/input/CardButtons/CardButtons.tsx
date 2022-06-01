import { Row } from "react-native-components";
import { CardButton, Separator } from "./CardButtons.styles";
import { ReactElement } from "react";

interface CardButtonProps {
    leftButtonOnPress: () => unknown;
    rightButtonOnPress: () => unknown;
    leftIcon: ReactElement;
    leftLabel: string;
    rightIcon: ReactElement;
    rightLabel: string;
}

const CardButtons = ({
    leftButtonOnPress,
    rightButtonOnPress,
    rightIcon,
    rightLabel,
    leftIcon,
    leftLabel,
}: CardButtonProps): JSX.Element => {
    return (
        <Row justifyContent="center">
            <CardButton onPress={leftButtonOnPress} position="left" leftIcon={leftIcon}>
                {leftLabel}
            </CardButton>
            <Separator />
            <CardButton onPress={rightButtonOnPress} position="right" rightIcon={rightIcon}>
                {rightLabel}
            </CardButton>
        </Row>
    );
};

export default CardButtons;
