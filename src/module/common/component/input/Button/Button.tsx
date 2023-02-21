import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";

const Button = ({ ...rest }: ButtonProps): JSX.Element => {
    return <ButtonRoot {...rest} />;
};

export default Button;
