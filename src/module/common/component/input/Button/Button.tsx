import { ButtonRoot } from "./Button.styles";
import { ButtonProps } from "module/common/component/input/Button/Button.types";
import { TouchableWithoutFeedback } from "react-native";

const Button = ({ onPress, style, children }: ButtonProps): JSX.Element => (
    <TouchableWithoutFeedback onPress={onPress} accessibilityRole="button">
        <ButtonRoot style={style}>{children}</ButtonRoot>
    </TouchableWithoutFeedback>
);

export default Button;
