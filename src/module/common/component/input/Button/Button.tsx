import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";

const Button = ({ type, ...rest }: ButtonProps): JSX.Element => {
    return (
        <ButtonRoot
            type={type}
            style={{
                lg: { height: 70 },
            }}
            {...rest}
        />
    );
};

export default Button;
