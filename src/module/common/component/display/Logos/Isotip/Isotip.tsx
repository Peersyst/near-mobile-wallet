import { Isotip as IsotipRoot, IsotipAnimatedContainer } from "./Isotip.styles";
import { IsotipProps } from "./Isotip.types";

const Isotip = ({ animation, size, ...rest }: IsotipProps) => (
    <IsotipAnimatedContainer animation={animation} size={size}>
        <IsotipRoot size={size} {...rest} />
    </IsotipAnimatedContainer>
);

export default Isotip;
