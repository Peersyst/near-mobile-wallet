import { BreadcrumbLine, BreadcrumbRoot } from "./Breadcrumbs.styles";
import BreadcrumbItem from "./BreadcrumbItem/BreadcrumbItem";
import { BreadcrumbsProps } from "./Breadcrumbs.types";
import { Fragment } from "react";

const Breadcrumbs = ({ index, length }: BreadcrumbsProps): JSX.Element => {
    return (
        <BreadcrumbRoot length={length}>
            {[...Array(length)].map((_, i) => {
                const active = i < numberOfActive;
                return (
                    <Fragment key={i}>
                        {i > 0 && <BreadcrumbLine length={length} active={active} />}
                        <BreadcrumbItem active={active} number={i + 1} />
                    </Fragment>
                );
            })}
        </BreadcrumbRoot>
    );
};

export default Breadcrumbs;
