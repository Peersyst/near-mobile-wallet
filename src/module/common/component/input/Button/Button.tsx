import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";

const Button = ({ type="dark", ...rest }: ButtonProps): JSX.Element => {
    return (
        <ButtonRoot
            type={type}
            {...rest}
        />
    );
};

export default Button;
