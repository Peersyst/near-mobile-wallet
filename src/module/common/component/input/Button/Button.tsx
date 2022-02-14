import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";

const Button = ({ type="dark", backgroundColor, ...rest }: ButtonProps): JSX.Element => {
    return (
        <ButtonRoot
            backgroundColor={backgroundColor}
            type={type}
            {...rest}
        />
    );
};

export default Button;
