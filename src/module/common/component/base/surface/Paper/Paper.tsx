import { PaperProps } from "module/common/component/base/surface/Paper/Paper.types";
import { PaperOverlay, PaperRoot } from "./Paper.styles";

const Paper = ({ elevation = 1, square = false, style, children, ...rest }: PaperProps): JSX.Element => (
    <PaperRoot elevation={elevation} square={square} style={style} {...rest}>
        <PaperOverlay elevation={elevation} square={square} />
        {children}
    </PaperRoot>
);

export default Paper;
