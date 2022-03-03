import { BreadcrumbLine, BreadcrumbRoot } from "./Breadcrumb.styles";
import BreadcrumbItem from "./BreadcrumbItem/BreadcrumbItem";
import { BreadcrumbProps } from "./Breadcrumb.types";
import { Fragment } from "react";

const Breadcrumb = ({ numberOfActive, length }: BreadcrumbProps): JSX.Element => {
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

export default Breadcrumb;
