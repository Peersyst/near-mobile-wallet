import { RippleNumberProps } from "./RippleNumber.types";
import { RippleNumberRoot, Item } from "./RippleNumber.styles";
import RippleAnimCircle from "../../display/RippleAnimCircle/RippleAnimCircle";
import { theme } from "module/common/style/theme";

const PadItem = ({ number }: RippleNumberProps) => {

    return (
        <RippleNumberRoot>
            <RippleAnimCircle 
            duration={600}
            size={70}
            color2={theme.palette.lightGray} />
            <Item>{number}</Item>
        </RippleNumberRoot>
    );
};

export default PadItem;
