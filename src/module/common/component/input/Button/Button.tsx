import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";

const Button = ({ appearence="dark",...rest }: ButtonProps): JSX.Element => {
    return (
        <ButtonRoot
            size={"lg"}
            appearence={appearence}
            {...rest}
        />
    );
};

export default Button;
