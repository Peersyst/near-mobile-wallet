import { BreadcrumpItemProps } from "../Breadcrump.types";
import { BreadcrumpItemRoot, BreadcrumpNumber } from "./BreadcrumpItem.styles";

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
