import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";

const Button = ({ appearance = "dark", size="lg", ...rest }: ButtonProps): JSX.Element => {
    return <ButtonRoot size={size} appearance={appearance} {...rest} />;
};

export default Button;
