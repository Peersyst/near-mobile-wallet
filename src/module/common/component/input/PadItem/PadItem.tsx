import { PadItemProps } from "./PadItem.types";
import { PadItemRoot, Item, ItemIcon } from "./PadItem.styles";
import { theme } from "module/common/style/theme";
import RippleAnimCircle from "../../util/RippleAnimCircle/RippleAnimCircle";
import { CrossIcon, BackIcon } from "icons";

const PadItem = ({ item, style, onPress }: PadItemProps) => {
    return (
        <PadItemRoot style={style}>
            <RippleAnimCircle onPress={onPress} duration={400} size={70} scaleStart={0.6} color2={theme.palette.lightGray} />
            {Number(item) < 10 ? <Item>{item}</Item> : <ItemIcon>{item === "X" ? <CrossIcon /> : <BackIcon />}</ItemIcon>}
        </PadItemRoot>
    );
};

export default PadItem;
