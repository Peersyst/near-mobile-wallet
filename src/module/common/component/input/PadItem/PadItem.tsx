import { PadItemProps } from "./PadItem.types";
import { PadItemRoot, Item, ItemIcon } from "./PadItem.styles";
import RippleAnimCircle from "../../display/RippleAnimCircle/RippleAnimCircle";
import { theme } from "module/common/style/theme";

const PadItem = ({ number, icon }: PadItemProps) => {
    return (
        <PadItemRoot>
            <RippleAnimCircle 
            duration={600}
            size={70}
            color2={theme.palette.lightGray} />
            {icon ? <ItemIcon>{icon}</ItemIcon> : <Item>{number}</Item> }
        </PadItemRoot>
    );
};

export default PadItem;
