import { BreadcrumbActiveLine, BreadcrumbLine, BreadcrumbRoot } from "./Breadcrumb.styles";
import BreadcrumbItem from "./BreadcrumbItem/BreadcrumbItem";
import { BreadcrumbProps } from "./Breadcrumb.types";

const Breadcrumb = ({ numberOfActive, length }: BreadcrumbProps): JSX.Element => {
    return (
        <BreadcrumbRoot length={length}>
            {[...Array(length)].map((_, i) => (
                <BreadcrumbItem key={i} active={i < numberOfActive} number={i} />
            ))}
            <BreadcrumbLine />
            <BreadcrumbActiveLine length={length} numberOfActive={numberOfActive} />
        </BreadcrumbRoot>
    );
};

export default Breadcrumb;
