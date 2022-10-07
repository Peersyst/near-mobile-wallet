import { ContainerProps } from "./Container.types";
import { ContainerRoot } from "./Container.styles";

const Container = (props: ContainerProps) => {
    return <ContainerRoot {...props} />;
};

export default Container;
