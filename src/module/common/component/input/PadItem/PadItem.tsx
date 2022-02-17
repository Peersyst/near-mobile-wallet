import { PadItemProps } from "./PadItem.types";
import { PadItemRoot, Item, ItemIcon } from "./PadItem.styles";
import { theme } from "module/common/style/theme";
import RippleAnimCircle from "../../util/RippleAnimCircle/RippleAnimCircle";

const PadItem = ({ number, icon }: PadItemProps) => {
    return (
        <PadItemRoot>
            <RippleAnimCircle 
            duration={400}
            size={70}
            scaleStart={0.7}
            color2={theme.palette.lightGray} />
            {icon ? <ItemIcon>{icon}</ItemIcon> : <Item>{number}</Item> }
        </PadItemRoot>
    );
};

export default PadItem;
