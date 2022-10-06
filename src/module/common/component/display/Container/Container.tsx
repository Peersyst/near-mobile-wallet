import { ContainerProps } from "./Container.types";
import { ContainerRoot } from "./Container.styles";

const Container = ({ fullWidth, children, ...rest }: ContainerProps) => {
    return (
        <ContainerRoot fullWidth {...rest}>
            {children}
        </ContainerRoot>
    );
};

export default Container;
