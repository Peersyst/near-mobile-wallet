import { BreadcrumpItemProps } from "../Breadcrumb.types";
import { BreadcrumpItemRoot, BreadcrumpNumber } from "./BreadcrumbItem.styles";

const BreadcrumpItem = ({active, number}: BreadcrumpItemProps): JSX.Element => {
    return (
        <BreadcrumpItemRoot active={active}>
            <BreadcrumpNumber active={active} >
                {number}
            </BreadcrumpNumber>
        </BreadcrumpItemRoot>
    );
};

export default BreadcrumpItem;
