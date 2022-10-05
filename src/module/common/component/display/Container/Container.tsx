import { ContainerProps } from "./Container.types";
import { ContainerRoot } from "./Container.styles";

const Container = (props: ContainerProps) => {
    return <ContainerRoot fullWidth>{props.children}</ContainerRoot>;
};

export default Container;
