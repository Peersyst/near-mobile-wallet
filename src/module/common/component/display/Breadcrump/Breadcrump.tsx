import { BreadcrumpActiveLine, BreadcrumpLine, BreadcrumpRoot } from "./Breadcrump.styles";
import BreadcrumpItem from "./BreadcrumpItem/BreadcrumpItem";
import { BreadcrumpProps } from "./Breadcrump.types";

const Breadcrump = ({ numberOfActive, length }: BreadcrumpProps): JSX.Element => {
    return (
        <BreadcrumpRoot length={length}>
            {[...Array(length)].map((_, i) => (
                <BreadcrumpItem key={i} active={i < numberOfActive} number={i} />
            ))}
            <BreadcrumpLine />
            <BreadcrumpActiveLine length={length} numberOfActive={numberOfActive} />
        </BreadcrumpRoot>
    );
};

export default Breadcrump;
