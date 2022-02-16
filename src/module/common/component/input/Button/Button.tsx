import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";

const Button = ({ appearance = "dark", ...rest }: ButtonProps): JSX.Element => {
    return <ButtonRoot size={"lg"} appearance={appearance} {...rest} />;
};

export default Button;
