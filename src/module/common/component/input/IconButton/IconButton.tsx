import { IconButtonRoot } from "./IconButton.styles";
import { IconButtonProps } from "./IconButton.types";

const IconButton = ({ ...rest }: IconButtonProps): JSX.Element => {
    return <IconButtonRoot {...rest} />;
};

export default IconButton;
