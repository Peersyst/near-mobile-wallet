import { BreadcrumbItemProps } from "../Breadcrumb.types";
import { BreadcrumbItemRoot, BreadcrumbNumber } from "./BreadcrumbItem.styles";

const BreadcrumbItem = ({active, number}: BreadcrumbItemProps): JSX.Element => {
    return (
        <BreadcrumbItemRoot active={active} >
            <BreadcrumbNumber active={active} >
                {number}
            </BreadcrumbNumber>
        </BreadcrumbItemRoot>
    );
};

export default BreadcrumbItem;
