import { PaperProps } from "module/common/component/base/surface/Paper/Paper.types";
import { PaperOverlay, PaperRoot } from "./Paper.styles";

const Paper = ({ elevation = 1, square = false, style, children }: PaperProps): JSX.Element => (
    <PaperRoot elevation={elevation} square={square} style={style}>
        <PaperOverlay elevation={elevation} />
        {children}
    </PaperRoot>
);

export default Paper;
