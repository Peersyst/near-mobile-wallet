import { PadItemProps } from "./PadItem.types";
import { PadItemRoot, ItemIcon, Item } from "./PadItem.styles";
import RippleAnimCircle from "../../util/RippleAnimCircle/RippleAnimCircle";
import { CrossIcon, BackIcon } from "icons";
import { useTheme } from "@peersyst/react-native-components";

const PadItem = ({ item, style, onPress }: PadItemProps) => {
    const theme = useTheme();

    return (
        <PadItemRoot style={style}>
            <RippleAnimCircle onPress={onPress} duration={400} size={70} scaleStart={0.6} color2={theme.palette.altOverlay["20%"]} />
            {Number(item) < 10 ? <Item>{item}</Item> : <ItemIcon>{item === "X" ? <CrossIcon /> : <BackIcon />}</ItemIcon>}
        </PadItemRoot>
    );
};

export default PadItem;
