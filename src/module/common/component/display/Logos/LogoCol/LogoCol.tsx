import { SvgIconProps } from "react-native-components";
import { LogoColIcon, LogoColRoot } from "./LogoCol.styles";

export type LogoColProps = Omit<SvgIconProps, "children">;

export type LogoColRootProps = Pick<SvgIconProps, "size">;

const LogoCol = ({ size, ...rest }: Omit<SvgIconProps, "children">): JSX.Element => {
    return (
        <LogoColRoot size={size}>
            <LogoColIcon size="100%" {...rest} />
        </LogoColRoot>
    );
};

export default LogoCol;
