import { BreadcrumbLine, BreadcrumbRoot } from "./Breadcrumb.styles";
import BreadcrumbItem from "./BreadcrumbItem/BreadcrumbItem";
import { BreadcrumbProps } from "./Breadcrumb.types";

const Breadcrumb = ({ numberOfActive, length }: BreadcrumbProps): JSX.Element => {
    return (
        <BreadcrumbRoot length={length}>
            {[...Array(length)].map((_, i) => {
                const active = i <= numberOfActive;
                return (
                    <>
                        {i > 0 && <BreadcrumbLine length={length} active={active} />}
                        <BreadcrumbItem key={i} active={active} number={i + 1} />
                    </>
                );
            })}
        </BreadcrumbRoot>
    );
};

export default Breadcrumb;
