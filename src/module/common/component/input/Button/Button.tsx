import { ButtonProps } from "./Button.types";
import { ButtonRoot } from "./Button.styles";
import { theme } from "module/common/style/theme";
import { useStyled } from "@peersyst/react-native-styled";

const Button = ({ type, sx: sxProp, ...rest }: ButtonProps): JSX.Element => {
    const sx = useStyled(sxProp, { type });
    return (
        <ButtonRoot
            type={type}
            style={{
                outlined: { borderColor: theme.palette.darkGray, height: 200 },
                lg: { height: 70 },
                ...sx()
            }}
            {...rest}
        />
    );
};

export default Button;
